import { FC } from 'react';
import { useMovieContext } from '../../state';
import { useMoviesApi } from '../../state/use-movies-api';
import { MovieEditorModal } from './movie-editor-modal';

export const MovieEditor: FC = () => {
  const { editor, closeEditor } = useMovieContext();
  const { addMovie, editMovie } = useMoviesApi();

  return (
    <MovieEditorModal
      isOpen={editor.showModal}
      onClose={closeEditor}
      movie={editor.movie}
      onSubmit={editor.movie ? editMovie : addMovie}
    />
  );
};
