import { Genre, GenreValues, Movie } from '../models';

export const findByGenre = (movies: Movie[], genres: Genre[]) => {
  if (!genres || genres.length === 0) {
    return movies;
  }
  const genreValues = genres
    .filter((genre) => genre in GenreValues)
    .map((genre) => GenreValues[genre]);
  return movies.filter((movie) =>
    [...movie.genres].some((genre) => genreValues.includes(genre))
  );
};
