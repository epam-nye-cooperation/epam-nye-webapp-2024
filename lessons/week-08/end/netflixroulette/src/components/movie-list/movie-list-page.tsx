import React, { useEffect, useState } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { Movie, MovieSortType, RawMovie } from '../../models';
import { MovieList } from './movie-list';
import { SearchBox } from '../search';
import { SortMovies } from './sort-movies';

const BASE_URL = 'http://localhost:5000';

export const MovieListPage = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [orderBy, setOrderBy] = useState<MovieSortType>(MovieSortType.RATING_DESC);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      const queryParams = new URLSearchParams({ search, orderBy });
      const response = await fetch(`${BASE_URL}/movies?${queryParams}`);
      const { data, total } = await response.json();
      setMovies(data.map((movie: RawMovie) => ({
        ...movie,
        release_date: new Date(movie.release_date),
      })));
      setTotal(total);
    };
    loadMovies();
  }, [search, orderBy, setMovies, setTotal]);

  return (
    <Box width="full" backgroundColor="background.dark">
      <Container maxWidth="4xl" paddingY="10">
        <Heading as="h3" textTransform="uppercase" fontSize="4xl" fontWeight="normal" marginBottom="9">Find your movie</Heading>
        <SearchBox query={search} onSearch={setSearch} />
      </Container>
      <Container maxWidth="6xl" paddingY="5">
        <SortMovies sortType={orderBy} onChange={setOrderBy} />
        {movies && <MovieList movies={movies}/>}
      </Container>
    </Box>
  );
};
