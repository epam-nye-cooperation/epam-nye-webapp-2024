import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useMoviesApi } from '../../state/use-movies-api';
import { Movie } from '../../models';
import { useAuthContext } from '../../auth/auth.context';

const menuItemStyle = {
  backgroundColor: 'background.dark',
  _focus: {
    backgroundColor: 'background.default',
  },
};

export interface MovieListItemMenuProps {
  movie: Movie;
}

export const MovieListItemMenu: FC<MovieListItemMenuProps> = ({ movie }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { authToken } = useAuthContext();
  const { deleteMovie } = useMoviesApi();

  return (
    <Box position="absolute" zIndex="10" top="2" right="2">
      <Menu onClose={onClose} onOpen={onOpen} isOpen={isOpen} placement="bottom-end">
        <MenuButton as={IconButton} icon={<HamburgerIcon color="text.highlighted" />} variant="secondary" />
        <MenuList bgColor="background.dark">
          <MenuItem onClick={() => {}} sx={menuItemStyle}>Edit movie</MenuItem>
          <MenuItem onClick={() => {deleteMovie(`${movie.id}`, authToken!)}} sx={menuItemStyle}>Delete movie</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};