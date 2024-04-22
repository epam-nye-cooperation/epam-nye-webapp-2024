import { Spell, SpellCategory, SpellSearchOrder } from './spells.type';

export type SpellFilter = (spell: Spell) => boolean;

export class SpellFilters {
  byQuery(query?: string): SpellFilter {
    if (!query) {
      return Boolean;
    }
    const searchQuery = query.toLowerCase();
    return ({name, incantation, effect}) => 
      name.toLowerCase().includes(searchQuery) ||
      incantation?.toLowerCase().includes(searchQuery) ||
      effect?.toLowerCase().includes(searchQuery);
  }

  byCategory(searchCategory?: SpellCategory): SpellFilter {
    if (!searchCategory) {
      return Boolean;
    }
    return ({ category }) => category.includes(searchCategory);
  }

  byLight(searchLight?: string): SpellFilter {
    if (!searchLight) {
      return Boolean;
    }
    const lightSearch = searchLight.toLowerCase();
    return ({ light }) => light?.toLowerCase().includes(lightSearch);
  }

  orderBy(order: SpellSearchOrder) {
    const [field, direction] = order.split('.');
    return (a: Spell, b: Spell) => {
      let result = 0;
      if (field === 'incantation' && a.incantation && b.incantation) {
        result = a.incantation.localeCompare(b.incantation);
      }
      if (result === 0) {
        result = a.name.localeCompare(b.name);
      }
      return direction === 'ASC' ? result : -result;
    };
  }
}