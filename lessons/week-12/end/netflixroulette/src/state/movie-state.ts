import { Movie, MovieSortType } from '../models';

export interface MovieResults {
  movies: Movie[];
  total: number;
};

export interface MovieStateActions {
  search: (query: string) => void;
  setResults: (results: MovieResults) => void;
  changeOrder: (order: MovieSortType) => void;
  openMovieEditor: (movie: Movie | null) => void;
  closeEditor: () => void;
}

export interface MovieEditorState {
  showModal: boolean;
  movie: Movie | null;
}

export interface MovieState {
  movies: Movie[];
  total: number;
  query: string;
  orderBy: MovieSortType;
  editor: MovieEditorState;
}

export const INITIAL_STATE: MovieState = {
  movies: [],
  total: 0,
  query: '',
  orderBy: MovieSortType.RATING_DESC,
  editor: {
    showModal: false,
    movie: null,
  },
};
