import { Reducer } from 'react';
import { MovieSortType } from '../models';
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
    query: action.payload,
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
    orderBy: action.payload,
  }),
};

type ActionName = keyof typeof movieStateReducer;
type ReducerParams = Parameters<(typeof movieStateReducer)[ActionName]>;

export type MovieStateReducer = Reducer<ReducerParams[0], ReducerParams[1]>;

export const movieReducer: MovieStateReducer = (state: MovieState, action: ReducerParams[1]) => {
  if (action && !(action.type in movieStateReducer)) {
    throw new Error(`Cannot use action '${action.type}' in CopyPageReducer`);
  }
  return movieStateReducer[action.type as ActionName](state, action as PayloadAction<any>);
};
