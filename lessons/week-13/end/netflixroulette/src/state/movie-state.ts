import { GenreId, Movie, MovieSortType } from '../models';
import { MovieSearchParams } from './use-movies-api';

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
  gotoPage: (page: number) => void;
  refreshSearchResults: () => void;
  toggleGenreFilters: (genre: GenreId | null) => void;
}

export interface MovieEditorState {
  showModal: boolean;
  movie: Movie | null;
}

export interface MovieState {
  movies: Movie[];
  total: number;
  editor: MovieEditorState;
  searchParams: MovieSearchParams;
}

export const INITIAL_STATE: MovieState = {
  movies: [],
  total: 0,
  editor: {
    showModal: false,
    movie: null,
  },
  searchParams: {
    search: '',
    orderBy: MovieSortType.RATING_DESC,
    offset: 0,
    limit: 12,
    genres: [],
  },
};
