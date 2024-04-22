import { Injectable } from '@nestjs/common';
import { SpellService } from '../spells/spells.service';
import { PotionService } from '../potions/potions.service';
import { SearchOrder, SearchParams, SearchResults, SearchType } from './search.type';
import { SearchUtils } from './search.utils';

@Injectable()
export class SearchService {

  constructor(private spells: SpellService, private potions: PotionService) {}

  public search({ type, query, orderBy = SearchOrder.NAME_ASC, offset = 0, limit = 20 }: SearchParams): SearchResults {
    const resultSet = [
      ...(type === SearchType.POTION || !query ? [] : this.spells.findByQuery(query).map((item) => item.searchResults())),
      ...(type === SearchType.SPELL || !query ? [] : this.potions.findByQuery(query).map((item) => item.searchResults())),
    ].filter(Boolean);
    const total = resultSet.length;
    return {
      total,
      results: resultSet.sort(SearchUtils.orderBy(orderBy)).slice(offset, offset + limit)
    };
  }

}