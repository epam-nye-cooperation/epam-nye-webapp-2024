import React, { FC, PropsWithChildren, useMemo, useReducer } from 'react';
import { MovieContextProvider } from './movie-context';
import { INITIAL_STATE, MovieResults, MovieStateActions } from './movie-state';
import { MovieStateReducer, movieReducer } from './movie-reducer';
import { MovieSortType } from '../models';

export const MovieProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer<MovieStateReducer>(movieReducer, INITIAL_STATE);

  const actions: MovieStateActions = useMemo(() => ({
    search: (query: string) => dispatch({ type: 'search', payload: query }),
    setResults: (results: MovieResults) => dispatch({ type: 'setResults', payload: results }),
    changeOrder: (order: MovieSortType) => dispatch({ type: 'changeOrder', payload: order }),
  }), [dispatch]);

  return (
    <MovieContextProvider value={{
      ...state,
      ...actions,
    }}>
      {children}
    </MovieContextProvider>
  );
};
