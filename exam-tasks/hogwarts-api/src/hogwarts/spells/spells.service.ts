import { Injectable, OnModuleInit } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { parse } from 'csv';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { Spell, SpellSearchOrder, SpellSearchParams } from './spells.type';
import { SearchResults } from '../search/search.type';
import { SpellFilters } from './spells.filters';

const DB_PATH = resolve(__dirname, '../../data/spells.csv');

@Injectable()
export class SpellService implements OnModuleInit {

  private spells = new Map<string, Spell>();
  private filters: SpellFilters;

  constructor() {
    this.filters = new SpellFilters();
  }

  async onModuleInit(): Promise<void> {
    const parser = createReadStream(DB_PATH).pipe(
      parse({
        columns: ['name', 'spellId', 'category', 'creator', 'effect', 'hand', 'image', 'incantation', 'light', 'wiki'],
        fromLine: 2,
      })
    );
    for await (const record of parser) {
      const spell = new Spell();
      spell.parseRaw(record);
      await validateOrReject(spell);
      this.spells.set(spell.spellId, spell);
    }
  }

  findByQuery(query: string): Spell[] {
    return Array.from(this.spells.values())
      .filter(this.filters.byQuery(query.toLowerCase()));
  }

  search({ query, category, light, offset = 0, limit = 20, orderBy = SpellSearchOrder.NAME_ASC }: SpellSearchParams): SearchResults {
    const resultItems = Array.from(this.spells.values())
      .filter(this.filters.byCategory(category))
      .filter(this.filters.byLight(light))
      .filter(this.filters.byQuery(query?.toLowerCase()))
      .sort(this.filters.orderBy(orderBy));
    return new SearchResults(resultItems.length, resultItems.slice(offset, offset + limit));
  }

  getById(spellId: string): Spell | null {
    return this.spells.get(spellId) ?? null;
  }

}
