import { Difficulty, Potion, PotionSearchOrder } from './potions.type';

export type PotionFilter = (potion: Potion) => boolean;

export const DIFFICULTIES = [
  Difficulty.BEGINNER,
  Difficulty.MODERATE,
  Difficulty.OWL,
  Difficulty.ADVANCED,
  Difficulty.MASTER,
];

export class PotionFilters {
  byQuery(query?: string): PotionFilter {
    if (!query) {
      return Boolean;
    }
    const searchQuery = query.toLowerCase();
    return ({name, effect, ingredients, sideEffects}: Potion) => (
      name.toLowerCase().includes(searchQuery) ||
      effect?.toLowerCase().includes(searchQuery) ||
      ingredients?.includes(searchQuery) ||
      sideEffects?.toLowerCase().includes(searchQuery)
    );
  }

  byDifficulty(searchDifficulty?: Difficulty): PotionFilter {
    if (!searchDifficulty) {
      return Boolean;
    }
    return ({ difficulty }) => searchDifficulty === difficulty;
  }

  orderBy(orderBy: PotionSearchOrder) {
    const [field, direction] = orderBy.split('.');
    return (a: Potion, b: Potion) => {
      let result = 0;
      if (field === 'difficulty') {
        result = DIFFICULTIES.indexOf(b.difficulty) - DIFFICULTIES.indexOf(a.difficulty);
      }
      if (!result || field === 'name') {
        result = a.name.localeCompare(b.name);
      }
      return direction === 'ASC' ? result : -result;
    };
  }
}
