import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { v4 as UUId } from 'uuid';
import { Configuration } from '../app.configuration';
import {
  AddForum,
  EditForum,
  Forum,
  SearchForums,
  StoredForum,
} from './forum.dto';
import { DateCompare, ForumFilters } from './forum.filters';
import { BaseComment, Comment } from './comment.dto';

const DB_PATH = resolve(__dirname, '../data/forums.json');

@Injectable()
export class ForumService implements OnModuleInit {
  private readonly logger = new Logger(ForumService.name);
  private filters: ForumFilters;
  private forums: Map<string, Forum> = new Map();

  constructor(config: ConfigService<Configuration>) {
    this.filters = new ForumFilters(config.get('LANGUAGE'));
  }

  async onModuleInit() {
    try {
      const data = await readFile(DB_PATH, 'utf8');
      const rawData = JSON.parse(data);
      this.forums = rawData.reduce(
        (db, rawForum: Forum) => {
          const forum = new StoredForum({
            id: rawForum.id,
            title: rawForum.title,
            description: rawForum.description,
            createdAt: new Date(rawForum.createdAt),
            createdBy: rawForum.createdBy,
            comments: rawForum.comments.map((rawComment: BaseComment) => {
              return new Comment({
                id: rawComment.id,
                message: rawComment.message,
                createdAt: new Date(rawComment.createdAt),
                userId: rawComment.userId,
              });
            })
          });
          db.set(forum.id, forum);
          return db;
        },
        this.forums,
      );
    } catch (error) {
      this.logger.error({
        message: `Cannot load database '${DB_PATH}': ${error.message}`,
        error,
      });
      throw new InternalServerErrorException('Loading forums failed');
    }
  }

  search(
    {
      query,
      after,
      before,
      orderBy,
      usersOnly,
      usersFirst,
    }: SearchForums,
    userId?: string
  ): StoredForum[] {
    return Array.from(this.forums.values())
      .filter(this.filters.byUser(usersOnly ? userId : undefined))
      .filter(this.filters.byQuery(query))
      .filter(this.filters.byDate(before, DateCompare.BEFORE))
      .filter(this.filters.byDate(after, DateCompare.AFTER))
      .sort(this.filters.orderBy(orderBy, usersFirst && userId)) as StoredForum[];
  }

  getForum(forumId: string): Forum | null {
    return this.forums.get(forumId) ?? null;
  }

  async createForum(userId: string, { title, description }: AddForum): Promise<StoredForum> {
    const existing = this.isForumExists(title);
    if (existing) {
      throw new ConflictException({
        message: 'A megadott néven már létezik egy vagy több fórum',
        existing: { id: existing.id, title: existing.title },
      });
    }
    const add = new StoredForum({
      id: UUId(),
      title,
      description,
      createdAt: new Date(),
      createdBy: userId,
      comments: []
    });
    this.forums.set(add.id, add);
    await this.saveDatabase();
    return add;
  }

  async updateForum(
    userId: string,
    forumId: string,
    { title, description }: EditForum,
  ): Promise<StoredForum> {
    const forum = this.forums.get(forumId);
    if (!forum) {
      throw new NotFoundException('A keresett fórum nem található');
    } else if (forum.createdBy !== userId) {
      throw new ForbiddenException('Hozzáférés megtagadva');
    }
    const update = new StoredForum(forum);
    if (title) {
      const existing = this.isForumExists(title);
      if (existing && existing.id !== forum.id) {
        throw new ConflictException({
          message: 'A megadott néven már létezik fórum',
          existing: { id: existing.id, title: existing.title },
        });
      }
    }
    update.title = title ?? update.title;
    update.description = description ?? update.description;
    this.forums.set(forumId, update);
    await this.saveDatabase();
    return update;
  }

  async deleteForum(userId: string, forumId: string): Promise<boolean> {
    const forum = this.forums.get(forumId);
    if (!forum) {
      throw new NotFoundException('A megadott jegyzet nem található');
    } else if (forum.createdBy !== userId) {
      throw new ForbiddenException('Hozzáférés megtagadva');
    }
    const removed = this.forums.delete(forumId);
    await this.saveDatabase();
    return removed;
  }

  async addComment(userId: string, forumId: string, message: string): Promise<Comment> {
    const forum = this.forums.get(forumId);
    if (!forum) {
      throw new NotFoundException('A megadott jegyzet nem található');
    }
    const comment = Comment.create(userId, message);
    const update = new StoredForum({
      ...forum,
      comments: [
        ...forum.comments,
        comment,
      ]
    });
    this.forums.set(update.id, update);
    await this.saveDatabase();
    return comment;
  }

  async updateComment(userId: string, forumId: string, commentId: string, message: string): Promise<Comment[]> {
    const forum = this.getForum(forumId);
    if (!forum) {
      throw new NotFoundException('A megadott fórum nem található');
    }
    const existing = forum.comments.find((comment) => comment.id === commentId);
    if (!existing) {
      throw new NotFoundException('A megadott hozzászólás nem található');
    } else if (existing.userId !== userId) {
      throw new ForbiddenException('Hozzáférés megtagadva');
    }
    const update = new StoredForum({
      ...forum,
      comments: forum.comments.map((comment) => {
        if (comment.id === commentId) {
          return new Comment({
            ...comment,
            message,
          });
        }
        return comment;
      })
    });
    this.forums.set(update.id, update);
    await this.saveDatabase();
    return update.comments;
  }

  async deleteComment(userId: string, forumId: string, commentId: string): Promise<boolean> {
    const forum = this.getForum(forumId);
    if (!forum) {
      throw new NotFoundException('A megadott fórum nem található');
    }
    const comment = forum.comments.find((comment) => comment.id === commentId);
    if (!comment) {
      throw new NotFoundException('A megadott hozzászólás nem található');
    } else if (comment.userId !== userId || forum.createdBy !== userId) {
      throw new ForbiddenException('Hozzáférés megtagadva');
    }
    const update = new StoredForum({
      ...forum,
      comments: forum.comments.filter((comment) => comment.id !== commentId),
    });
    this.forums.set(update.id, update);
    await this.saveDatabase();
    return forum.comments.length !== update.comments.length;
  }

  protected isForumExists(title: string) {
    return Array.from(this.forums.values()).find(this.filters.byTitle(title));
  }

  protected async saveDatabase() {
    try {
      await writeFile(DB_PATH, JSON.stringify(Array.from(this.forums.values()), null, 2))
    } catch (err) {
      this.logger.error(err);
    }
  }
}
