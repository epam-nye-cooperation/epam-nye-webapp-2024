import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Movie } from '../../models';
import { MovieDescription } from './movie-description';
import { useMoviesApi } from '../../state/use-movies-api';

export const MoviePage: FC = () => {
  const { movieId } = useParams<"movieId">();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { getMovie } = useMoviesApi();

  useEffect(() => {
    (async () => {
      try {
        if (!movieId) {
          return;
        }
        const movie = await getMovie(movieId);
        setMovie(movie);
      } catch (err) {
        //what to do now?
      }
    })();
  }, [movieId, getMovie, setMovie]);

  if (!movie) {
    return null;
  }

  return (
    <MovieDescription movie={movie} />
  );
};
