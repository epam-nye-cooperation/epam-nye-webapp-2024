import { AddIcon } from '@chakra-ui/icons';
import { Box, ChakraProps, Container, Flex, IconButton, Text} from '@chakra-ui/react';
import { useAuthContext } from '../../auth/auth.context';
import { useMovieContext } from '../../state';
import { Pagination } from '../pagination/pagination';
import { MovieList } from './movie-list';
import { MovieTypeFilter } from './movie-type-filter';
import { SortMovies } from './sort-movies';

export const MovieListPage = () => {
  const { changeOrder, gotoPage, openMovieEditor, toggleGenreFilters, searchParams, movies, total } = useMovieContext();
  const { user } = useAuthContext();

  return (
    <Box width="full" backgroundColor="background.dark" marginTop="5">
      <Container maxWidth="6xl" paddingY="5">
        <Flex sx={filterStyle}>
          <MovieTypeFilter selectedFilters={searchParams.genres} selectFilter={toggleGenreFilters} />
          <SortMovies sortType={searchParams.orderBy} onChange={changeOrder} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" marginY="5">
          <Text><strong>{total}</strong> filmet találtunk</Text>
          {user && <IconButton aria-label="Új film hozzáadása" icon={<AddIcon />} borderRadius="50%" onClick={() => openMovieEditor(null)} />}
        </Flex>
        {movies && <MovieList movies={movies}/>}
        <Box marginTop="12">
          <Pagination total={total} offset={searchParams.offset} limit={searchParams.limit} goto={gotoPage} />
        </Box>
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