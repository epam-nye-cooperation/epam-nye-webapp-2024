import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';
import { SearchType } from '../search/search.type';
import { readFile, writeFile } from 'fs/promises';
import { PotionService } from '../potions/potions.service';
import { SpellService } from '../spells/spells.service';
import { DIFFICULTIES } from '../potions/potions.filters';
import { Spell } from '../spells/spells.type';
import { Potion } from '../potions/potions.type';
import { HouseService } from '../houses/houses.service';
import { User } from 'src/users/user.type';

const DB_PATH = resolve(__dirname, '../../data/learned-materials.json');

export const MIN_LEVEL = 5;
export const LEARN_SPELL_POINTS = 10;
export const LEARN_POTION_POINTS_PER_LEVEL = 10;

type StoredLearnedMaterials = Record<SearchType, string[]>;
type LearnedMaterials = Record<SearchType, Set<string>>;

@Injectable()
export class LearnService implements OnModuleInit {

  private logger = new Logger(LearnService.name);
  private learnedMaterials: Map<string, LearnedMaterials>;

  constructor(private potions: PotionService, private spells: SpellService, private houses: HouseService) {}

  async onModuleInit(): Promise<void> {
    try {
      const rawData = JSON.parse(await readFile(DB_PATH, 'utf-8')) as Record<string, StoredLearnedMaterials>;
      this.learnedMaterials = Object.entries(rawData).reduce((learned, [userId, materials]) => {
        const subjects = Object.entries(materials).reduce((subjects, [subject, material]) => {
          subjects[subject] = new Set(material);
          return subjects;
        }, {} as LearnedMaterials);
        learned.set(userId, subjects);
        return learned;
      }, new Map<string, LearnedMaterials>());
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Cannot load learned materials');
    }
  }

  getLearnedSpells(userId: string): Spell[] {
    return Array.from(this.getLearnedMaterials(userId)[SearchType.SPELL].values())
      .map((spellId) => this.spells.getById(spellId))
      .filter(Boolean);
  }

  getLearnedPotions(userId: string): Potion[] {
    return Array.from(this.getLearnedMaterials(userId)[SearchType.POTION].values())
      .map((potionId) => this.potions.getById(potionId))
      .filter(Boolean);
  }

  async learnPotion({ userId, house }: User, subjectId: string): Promise<Potion> {
    const studentSubjects = this.getLearnedMaterials(userId);
    if (!this.potionCanBeLearned(subjectId, studentSubjects.potion)) {
      throw new ForbiddenException('Még nem vagy elég képzett ehhez a bájitalhoz');
    }
    const potion = this.potions.getById(subjectId);
    studentSubjects.potion.add(potion.potionId);
    this.learnedMaterials.set(userId, studentSubjects);
    const level = DIFFICULTIES.indexOf(potion.difficulty);
    await Promise.all([this.save(), this.houses.addPoints(house, (level + 1) * LEARN_POTION_POINTS_PER_LEVEL )]);
    return potion;
  }

  async learnSpell({ userId, house }: User, spellId: string): Promise<Spell> {
    const studentSubjects = this.getLearnedMaterials(userId);
    if (!this.spells.getById(spellId)) {
      throw new NotFoundException('A varázslat nem található');
    } else if (studentSubjects.spell.has(spellId)) {
      throw new ConflictException('Ezt a varázslatot már megtanultad');
    }
    studentSubjects.spell.add(spellId);
    this.learnedMaterials.set(userId, studentSubjects);
    await Promise.all([this.save(), this.houses.addPoints(house, LEARN_SPELL_POINTS)]);
    await this.save();
    return this.spells.getById(spellId);
  }

  private getLearnedMaterials(userId: string): LearnedMaterials {
    return this.learnedMaterials.get(userId) ?? {
      [SearchType.POTION]: new Set(),
      [SearchType.SPELL]: new Set(),
    };
  }

  private potionCanBeLearned(potionId: string, history: Set<string>): boolean {
    const potion = this.potions.getById(potionId);
    if (!potion) {
      throw new NotFoundException(`A bájital nem található: ${potionId}`);
    }
    if (history.has(potionId)) {
      throw new ConflictException('Ezt a bájitalt már megtanultad');
    }
    const level = DIFFICULTIES.indexOf(potion.difficulty);
    if (level === -1) {
      throw new InternalServerErrorException({ message: 'A bájital nehézségi foka nem megfelelő', potionId, difficulty: potion.difficulty });
    }
    //beginner
    if (level === 0) {
      return true;
    }

    const required = DIFFICULTIES[level - 1];
    const learnedPotions = Array.from(history.values())
      .map((id) => this.potions.getById(id))
      .filter(((potion) => potion.difficulty === required)).length;

    return learnedPotions >= MIN_LEVEL;
  }

  private async save(): Promise<void> {
    try {
      const items = Array.from(this.learnedMaterials.entries()).reduce((learnedItems, [userId, materials]) => {
        return {
          ...learnedItems,
          [userId]: Array.from(Object.entries(materials)).reduce((learned, [type, items]) => {
            return {
              ...learned,
              [type]: Array.from(items.values()),
            };
          }, {} as StoredLearnedMaterials),
        };
      }, {} as Record<string, StoredLearnedMaterials>);
      await writeFile(DB_PATH, JSON.stringify(items, null, 2), 'utf-8');
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('A tananyagok mentése sikertelen');
    }
  }

}
