import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Movie } from '../../models';
import { MovieDescription } from './movie-description';

const BASE_URL = 'http://localhost:5000';

export const MoviePage: FC = () => {
  const { movieId } = useParams<"movieId">();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BASE_URL}/movies/${movieId}`);
      if (!response.ok) {
        // what to do now?
        return;
      }
      const movieData = await response.json();
      setMovie({
        ...movieData,
        release_date: new Date(movieData.release_date),
      });
    })();
  }, [movieId, setMovie]);

  if (!movie) {
    return null;
  }

  return (
    <MovieDescription movie={movie} />
  );
};
