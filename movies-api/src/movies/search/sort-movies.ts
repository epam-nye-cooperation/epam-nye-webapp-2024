import { Movie } from '../models';
import { MovieSearchQuery, MovieSortBy } from './search-query.dto';

export const sortMovies = (
  movies: Movie[],
  { sortBy, sortOrder }: MovieSearchQuery
) => {
  const result = [...movies];
  if (!sortBy || !sortOrder) {
    return result;
  }
  return result.sort((a, b) => {
    let aField = a[sortBy];
    let bField = b[sortBy];

    if (sortOrder === 'desc') {
      const tmp = aField;
      aField = bField;
      bField = tmp;
    }

    if (typeof aField === 'string') {
      if (sortBy === MovieSortBy.release_date) {
        return new Date(aField).getTime() - new Date(bField).getTime();
      }
      return aField.localeCompare(bField as string);
    }

    if (typeof aField === 'number') {
      return aField - (bField as number);
    }

    return 0;
  });
};
