import React, { useEffect } from 'react';
import { Box, Container} from '@chakra-ui/react';
import { MovieList } from './movie-list';
import { SortMovies } from './sort-movies';
import { useMovieContext } from '../../state';
import { useMoviesApi } from '../../state/use-movies-api';

export const MovieListPage = () => {
  const { changeOrder, setResults, query, orderBy, movies } = useMovieContext();
  const { searchMovies } = useMoviesApi();

  useEffect(() => {
    const loadMovies = async () => {
      const results = await searchMovies({ search: query, orderBy });
      setResults(results);
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
