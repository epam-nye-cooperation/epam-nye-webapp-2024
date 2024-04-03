import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Movie, RawMovie } from '../../models';
import { MovieList } from './movie-list';

export const MovieListPage = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await fetch('http://localhost:5000/movies');
      const { data } = await response.json();
      setMovies(data.map((movie: RawMovie) => ({
        ...movie,
        release_date: new Date(movie.release_date),
      })));
    };
    loadMovies();
  }, []);

  return (
    <Box width="full" backgroundColor="background.dark">
      {movies && <MovieList movies={movies}/>}
    </Box>
  );
};
