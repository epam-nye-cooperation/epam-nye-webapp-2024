import { useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieSearchParams } from './use-movies-api';
import { INITIAL_STATE } from './movie-state';

export const useMovieSearchQuery = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const setParamsRef = useRef(setQueryParams);

  const defaultValues = Array.from(queryParams.entries())
    .reduce(
      (searchQuery, [key, value]) => {
        return {
          ...searchQuery,
          [key]: (key in searchQuery ? [searchQuery[key as keyof MovieSearchParams], value].flat() : value)
        };
      },
      {} as MovieSearchParams
    );

  const updateQueryParams = useCallback(
    (searchParams: MovieSearchParams) => {
      const initialParams = INITIAL_STATE.searchParams;
      const queryParams = Object.entries(searchParams).reduce(
        (params, [key, value]) => {
          const initValue = initialParams[key as keyof MovieSearchParams];
          if (initValue !== value) {
            if (Array.isArray(value)) {
              if (value.length && value.length !== (initValue as typeof value).length) {
                value.forEach((val) => params.append(key, val));
              }
          } else {
              params.append(key, value);
            }
          }
          return params;
        },
        new URLSearchParams()
      );
      setParamsRef.current?.(queryParams);
    },
    []
  );

  return {
    queryParams: defaultValues,
    updateQueryParams,
  };
};