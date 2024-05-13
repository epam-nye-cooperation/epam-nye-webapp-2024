import { useEffect } from 'react';
import { Box, ChakraProps, Container, Flex} from '@chakra-ui/react';
import { useMoviesApi, useMovieContext } from '../../state';
import { MovieList } from './movie-list';
import { SortMovies } from './sort-movies';

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
        <Flex sx={filterStyle}>
          <SortMovies sortType={orderBy} onChange={changeOrder} />
        </Flex>
        {movies && <MovieList movies={movies}/>}
      </Container>
    </Box>
  );
};

const filterStyle: ChakraProps['sx'] = {
  alignItems: 'center',
  borderBottom: 'solid 2px',
  paddingBottom: 2,
  borderBottomColor: 'gray.600',
  justifyContent: 'space-between',
  marginBottom: '6',
};