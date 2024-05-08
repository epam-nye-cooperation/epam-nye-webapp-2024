import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { useMoviesApi } from '../../state/use-movies-api';
import { Movie } from '../../models';
import { useMovieContext } from '../../state';

export interface MovieListItemMenuProps {
  movie: Movie;
}

export const MovieListItemMenu: FC<MovieListItemMenuProps> = ({ movie }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteMovie } = useMoviesApi();
  const { openMovieEditor } = useMovieContext();

  return (
    <Box position="absolute" zIndex="10" top="2" right="2">
      <Menu onClose={onClose} onOpen={onOpen} isOpen={isOpen} placement="bottom-end">
        <MenuButton as={IconButton} icon={<HamburgerIcon color="text.highlighted" />} variant="secondary" />
        <MenuList>
          <MenuItem onClick={() => {openMovieEditor(movie)}}>Edit movie</MenuItem>
          <MenuItem onClick={() => {deleteMovie(`${movie.id}`)}}>Delete movie</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};