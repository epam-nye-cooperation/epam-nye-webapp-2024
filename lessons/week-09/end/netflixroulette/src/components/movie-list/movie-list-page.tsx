import React, { useEffect } from 'react';
import { Box, Container} from '@chakra-ui/react';
import { MovieList } from './movie-list';
import { SortMovies } from './sort-movies';
import { useMovieContext } from '../../state';
import { RawMovie } from '../../models';

const BASE_URL = 'http://localhost:5000';

export const MovieListPage = () => {
  //movie-list-page.tsx:
  const { changeOrder, setResults, query, orderBy, movies } = useMovieContext();

  useEffect(() => {
    const loadMovies = async () => {
      const queryParams = new URLSearchParams({ search: query, orderBy });
      const response = await fetch(`${BASE_URL}/movies?${queryParams}`);
      const { data, total } = await response.json();
      setResults({
        movies: data.map((movie: RawMovie) => ({ ...movie, release_date: new Date(movie.release_date) })),
        total
      });
    };
    loadMovies();
  }, [query, orderBy, setResults]);

  return (
    <Box width="full" backgroundColor="background.dark" marginTop="5">
      <Container maxWidth="6xl" paddingY="5">
        <SortMovies sortType={orderBy} onChange={changeOrder} />
        {movies && <MovieList movies={movies}/>}
      </Container>
    </Box>
  );
};
