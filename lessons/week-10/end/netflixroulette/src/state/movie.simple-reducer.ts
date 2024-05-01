//simple version
import { Reducer } from 'react';
import { Movie, MovieSortType } from '../models';

export interface MovieState {
  movies: Movie[];
  total: number;
  search: string;
  orderBy: MovieSortType;
}

export const INITIAL_STATE: MovieState = {
  movies: [],
  total: 0,
  search: '',
  orderBy: MovieSortType.RATING_DESC,
};

type MovieReducer = Reducer<MovieState, Partial<MovieState>>;

export const movieReducer: MovieReducer = (state, changedParams) => {
  return ({
    ...state,
    ...changedParams,
  });
}