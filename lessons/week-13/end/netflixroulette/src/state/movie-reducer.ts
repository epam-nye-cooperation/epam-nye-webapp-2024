import { Reducer } from 'react';
import { GenreId, Movie, MovieSortType } from '../models';
import { MovieResults, MovieState, MovieStateActions } from './movie-state';

export interface PayloadAction<P> {
  type: keyof MovieStateActions;
  payload: P;
};

const movieStateReducer = {
  search: (
    state: MovieState,
    action: PayloadAction<string>
  ): MovieState => ({
    ...state,
    searchParams: {
      ...state.searchParams,
      search: action.payload,
      offset: 0,
    },
  }),
  setResults: (
    state: MovieState,
    action: PayloadAction<MovieResults>
  ): MovieState => ({
    ...state,
    ...action.payload,
  }),
  changeOrder: (
    state: MovieState,
    action: PayloadAction<MovieSortType>
  ): MovieState => ({
    ...state,
    searchParams: {
      ...state.searchParams,
      orderBy: action.payload,
    },
  }),
  openMovieEditor: (
    state: MovieState,
    action: PayloadAction<Movie | null>
  ): MovieState => ({
    ...state,
    editor: {
      showModal: true,
      movie: action.payload,
    },
  }),
  closeEditor: (
    state: MovieState,
    action: PayloadAction<any>
  ): MovieState => ({
    ...state,
    editor: {
      showModal: false,
      movie: null,
    },
  }),
  gotoPage: (
    state: MovieState,
    action: PayloadAction<number>
  ): MovieState => {
    const maxPage = Math.ceil(state.total / state.searchParams.limit);
    const page = action.payload < 1 ? 1 : (action.payload > maxPage) ? maxPage: action.payload;
    const offset = (page - 1) * state.searchParams.limit;
    return {
      ...state,
      searchParams: {
        ...state.searchParams,
        offset,
      },
    };
  },
  refreshSearchResults: (
    state: MovieState,
    action: PayloadAction<any>
  ): MovieState => ({
    ...state,
    searchParams: { ...state.searchParams },
  }),
  toggleGenreFilters: (
    state: MovieState,
    action: PayloadAction<GenreId | null>
  ): MovieState => {
    let genres: Array<GenreId> = [];
    const { searchParams } = state;
    if (action.payload) {
      if (searchParams.genres.includes(action.payload)) {
        genres = searchParams.genres.filter((genre) => genre !== action.payload);
      } else {
        genres = [...searchParams.genres, action.payload];
      }
    }
    return {
      ...state,
      searchParams: {
        ...state.searchParams,
        genres,
        offset: 0,
      },
    };
  },
};

type ActionName = keyof typeof movieStateReducer;
type ReducerParams = Parameters<(typeof movieStateReducer)[ActionName]>;

export type MovieStateReducer = Reducer<ReducerParams[0], ReducerParams[1]>;

export const movieReducer: MovieStateReducer = (state: MovieState, action: ReducerParams[1]) => {
  if (action && !(action.type in movieStateReducer)) {
    throw new Error(`Cannot use action '${action.type}' in CopyPageReducer`);
  }
  // @ts-ignore
  return movieStateReducer[action.type as ActionName](state, action as PayloadAction<any>);
};
