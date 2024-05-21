import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useToast } from '@chakra-ui/react';
import { FC } from 'react';
import { useMoviesApi } from '../../state/use-movies-api';
import { Movie } from '../../models';
import { useMovieContext } from '../../state';
import { useConfirmation } from '../confirmation';

export interface MovieListItemMenuProps {
  movie: Movie;
}

export const MovieListItemMenu: FC<MovieListItemMenuProps> = ({ movie }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteMovie } = useMoviesApi();
  const { openMovieEditor, refreshSearchResults } = useMovieContext();
  const { Dialog, confirm } = useConfirmation(
    'Film törlése',
    `Biztosan törölni akarja a(z) ${movie.title} filmet?`
  );
  const toast = useToast();

  const handleDelete = async () => {
    const approved = await confirm();
    if (approved) {
      toast.promise(deleteMovie(`${movie.id}`), {
        success: () => {
          refreshSearchResults();
          return { title: 'Sikeres törlés', description: 'A film törlése sikeresen megtörtént', duration: 3000 };
        },
        error: { title: 'Hiba történt', description: 'A film törlése során hiba történt', duration: 3000 },
        loading: { title: 'Kis türelmet', description: 'Törlés folyamatban...' },
      });
    }
  };

  return (
    <Box position="absolute" zIndex="10" top="2" right="2">
      <Menu onClose={onClose} onOpen={onOpen} isOpen={isOpen} placement="bottom-end">
        <MenuButton as={IconButton} icon={<HamburgerIcon color="text.highlighted" />} variant="secondary" />
        <MenuList>
          <MenuItem onClick={() => {openMovieEditor(movie)}}>Módosítás</MenuItem>
          <MenuItem onClick={handleDelete}>Film törlése</MenuItem>
        </MenuList>
      </Menu>
      <Dialog />
    </Box>
  );
};