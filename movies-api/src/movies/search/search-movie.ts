import { Movie } from '../models';

export const searchMovie = (movies: Movie[], search: string) => {
  if (!search?.trim()) {
    return movies;
  }
  const query = new RegExp(search.trim(), 'i');
  return movies.filter((movie) => query.test(movie.title));
};
