import { FC, PropsWithChildren, useEffect, useMemo, useReducer } from 'react';
import { MovieContextProvider } from './movie-context';
import { INITIAL_STATE, MovieResults, MovieStateActions } from './movie-state';
import { MovieStateReducer, movieReducer } from './movie-reducer';
import { GenreId, Movie, MovieSortType } from '../models';
import { useMoviesApi } from './use-movies-api';
import { useMovieSearchQuery } from './use-movie-search-query';

export const MovieProvider: FC<PropsWithChildren> = ({ children }) => {
  const { queryParams, updateQueryParams } = useMovieSearchQuery();
  const [state, dispatch] = useReducer<MovieStateReducer>(movieReducer, {
    ...INITIAL_STATE,
    searchParams: {
      ...INITIAL_STATE.searchParams,
      ...queryParams,
    },
  });
  const { searchMovies } = useMoviesApi();

  const actions: MovieStateActions = useMemo(() => ({
    search: (query: string) => dispatch({ type: 'search', payload: query }),
    setResults: (results: MovieResults) => dispatch({ type: 'setResults', payload: results }),
    changeOrder: (order: MovieSortType) => dispatch({ type: 'changeOrder', payload: order }),
    openMovieEditor: (movie: Movie | null) => dispatch({ type: 'openMovieEditor', payload: movie }),
    closeEditor: () => dispatch({ type: 'closeEditor', payload: undefined }),
    gotoPage: (page: number) => dispatch({ type: 'gotoPage', payload: page }),
    toggleGenreFilters: (genre: GenreId | null) => dispatch({ type: 'toggleGenreFilters', payload: genre }),
    refreshSearchResults: () => dispatch({ type: 'refreshSearchResults', payload: undefined }),
  }), [dispatch]);

  useEffect(() => {
    (async () => {
      const results = await searchMovies(state.searchParams);
      actions.setResults(results);
      
      updateQueryParams(state.searchParams);
    })();
  }, [state.searchParams, searchMovies, actions, updateQueryParams]);

  return (
    <MovieContextProvider value={{
      ...state,
      ...actions,
    }}>
      {children}
    </MovieContextProvider>
  );
};
