import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FC } from 'react';
import { MovieEditorForm } from './movie-editor-form';
import { Movie } from '../../models';

export interface MovieEditorModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (movie: Movie) => Promise<Movie>;
}

export const MovieEditorModal: FC<MovieEditorModalProps> = ({ isOpen, movie, onClose, onSubmit }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="5xl">
    <ModalOverlay />
    <ModalContent padding={6}>
      <ModalHeader fontSize="4xl">
        {movie ? 'Film módosítása' : 'Film hozzáadása'}
      </ModalHeader>
      <ModalCloseButton size="sm" />
      <ModalBody marginBottom={6}>
        <MovieEditorForm movie={movie} onSubmit={onSubmit} onCancel={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
);
