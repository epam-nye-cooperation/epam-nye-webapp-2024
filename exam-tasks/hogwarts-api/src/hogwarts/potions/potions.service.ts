import { Injectable, OnModuleInit } from '@nestjs/common';
import { parse } from 'csv';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { Potion, PotionSearchParams } from './potions.type';
import { validateOrReject } from 'class-validator';
import { PotionFilters } from './potions.filters';
import { SearchResults } from '../search/search.type';

const DB_PATH = resolve(__dirname, '../../data/potions.csv');

@Injectable()
export class PotionService implements OnModuleInit{

  private potions = new Map<string, Potion>();
  private filters: PotionFilters;

  constructor() {
    this.filters = new PotionFilters();
  }

  async onModuleInit(): Promise<void> {
    const parser = createReadStream(DB_PATH).pipe(
      parse({
        columns: ['name', 'potionId', 'characteristics', 'difficulty', 'effect', 'image', 'ingredients', 'inventors', 'manufacturers', 'side_effects', 'time', 'wiki'],
        fromLine: 2,
      })
    );
    for await (const record of parser) {
      const potion = new Potion();
      potion.parseRaw(record);
      await validateOrReject(potion);
      this.potions.set(potion.potionId, potion);
    }
  }

  public getById(potionId: string): Potion | null {
    return this.potions.get(potionId) ?? null;
  }

  public findByQuery(query: string): Potion[] {
    const searchQuery = query.toLowerCase();
    return Array.from(this.potions.values())
      .filter(this.filters.byQuery(searchQuery));
  }

  public search({ query, difficulty, orderBy, offset, limit }: PotionSearchParams): SearchResults {
    const results = Array.from(this.potions.values())
      .filter(this.filters.byDifficulty(difficulty))
      .filter(this.filters.byQuery(query))
      .sort(this.filters.orderBy(orderBy))
    return new SearchResults(results.length, results.slice(offset, limit + offset));
  }

}