import { v4 as UUId } from 'uuid';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { filterXSS } from 'xss';
import { Configuration } from '../app.configuration';
import { AddNoteItem, BaseNote, BaseNoteItem, CreateNote, Note, NoteItem, SearchNotes } from './notes.dto';
import { DateCompare, NotesFilters } from './notes.filters';
import { ConfigService } from '@nestjs/config';
import { validate } from 'class-validator';

const DB_PATH = resolve(__dirname, '../data/notes.json');

@Injectable()
export class NotesService implements OnModuleInit {
  private readonly logger = new Logger(NotesService.name);
  private filters: NotesFilters;
  private notes: Map<string, Map<string, Note>> = new Map();

  constructor(config: ConfigService<Configuration>) {
    this.filters = new NotesFilters(config.get('LANGUAGE'));
  }

  async onModuleInit() {
    try {
      const data = await readFile(DB_PATH, 'utf8');
      const rawData = JSON.parse(data);
      this.notes = Object.entries(rawData).reduce((db, [userId, notes]: [string, Note[]]) => {
        const userNotes = notes.reduce((userNotes, rawNote) => {
          const note = new Note(rawNote);
          userNotes.set(note.id, note);
          return userNotes;
        }, new Map<string, Note>());
        db.set(userId, userNotes);
        return db;
      }, this.notes);
    } catch (error) {
      this.logger.error({
        message: `Cannot load database '${DB_PATH}': ${error.message}`,
        error,
      });
      throw new InternalServerErrorException('Loading notes failed');
    }
  }

  searchNotes(userId: string, { query, color, favorites, after, before, orderBy, favoritesFirst }: SearchNotes): Note[] {
    const userNotes = this.notes.get(userId);
    if (userNotes) {
      return Array.from(userNotes.values())
        .filter(this.filters.byFavorite(favorites))
        .filter(this.filters.byColor(color))
        .filter(this.filters.byDate(after, DateCompare.AFTER))
        .filter(this.filters.byDate(before, DateCompare.BEFORE))
        .filter(this.filters.byQuery(query))
        .sort(this.filters.orderBy(orderBy, favoritesFirst));
    }
    return [];
  }

  getNote(userId: string, noteId: string): Note | null {
    return this.notes.get(userId)?.get(noteId) ?? null;
  }

  addNote(userId: string, note: CreateNote): Note {
    const add: Note = new Note({
      title: filterXSS(note.title),
      color: note.color,
      isFavorite: note.isFavorite,
      creationDate: new Date(),
      id: UUId(),
      items: [],
    });

    if (!this.notes.has(userId)) {
      this.notes.set(userId, new Map());
    }

    const userNotes = this.notes.get(userId);
    userNotes.set(add.id, add);
    this.notes.set(userId, userNotes);

    return add;
  };

  async updateNote(userId: string, noteId: string, { isFavorite, color, title }: BaseNote): Promise<Note> {
    const note = this.getNote(userId, noteId);
    if (!note) {
      throw new NotFoundException('A megadott jegyzet nem található');
    }
    if ([typeof title, typeof color, typeof isFavorite].every((type) => type === 'undefined')) {
      throw new BadRequestException('Érvénytelen paraméterek: legalább az egyik rendelkezzen értékkel: `title`, `color`, `isFavorite`');
    }
    const update = new Note(note);
    update.isFavorite = isFavorite ?? note.isFavorite;
    update.color = color ?? note.color;
    update.title = filterXSS(title ?? '') || note.title;
    const errors = await validate(update);
    if (errors.length) {
      this.logger.debug(errors);
      throw new BadRequestException(errors.map(({ value, property, constraints }) => ({
        value, property, constraints
      })));
    }

    const userNotes = this.notes.get(userId);
    userNotes.set(note.id, update);
    this.notes.set(userId, userNotes);

    return update;
  }

  deleteNote(userId: string, noteId: string) {
    const userNotes = this.notes.get(userId);
    if (!userNotes.has(noteId)) {
      throw new NotFoundException('A megadott jegyzet nem található');
    }
    return userNotes.delete(noteId);
  }

  addItem(userId: string, noteId: string, item: AddNoteItem): Note {
    const note = this.getNote(userId, noteId);
    if (!note) {
      throw new NotFoundException('A megadott jegyzet nem található');
    }

    const addedItem = new NoteItem();
    addedItem.id = UUId();
    addedItem.isDone = item.isDone;
    addedItem.label = filterXSS(item.label);

    note.items = [
      ...note.items,
      addedItem,
    ];

    const userNotes = this.notes.get(userId);
    userNotes.set(note.id, note);
    this.notes.set(userId, userNotes);

    return note;
  }

  updateItem(userId: string, noteId: string, taskId: string, item: BaseNoteItem): Note {
    const note = this.getNote(userId, noteId);
    if (!note) {
      throw new NotFoundException('A megadott jegyzet nem található');
    }
    note.items = note.items?.map((noteItem) => {
      return noteItem.id === taskId ? {
        ...noteItem,
        ...item,
      } : noteItem;
    });

    const userNotes = this.notes.get(userId);
    userNotes.set(note.id, note);
    this.notes.set(userId, userNotes);

    return note;
  }

  removeItem(userId: string, noteId: string, taskId: string): Note {
    const note = this.getNote(userId, noteId);
    if (!note) {
      throw new NotFoundException('A megadott jegyzet nem található');
    }
    note.items = note.items?.filter((item) => item.id !== taskId);
    const userNotes = this.notes.get(userId);
    userNotes.set(note.id, note);
    this.notes.set(userId, userNotes);
    return note;
  }

}
