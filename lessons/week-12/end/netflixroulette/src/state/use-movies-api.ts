import { useCallback } from 'react';
import { Movie, MovieSortType, RawMovie } from '../models';
import { MovieResults } from './movie-state';
import { useAuthContext } from '../auth/auth.context';

const BASE_URL = 'http://localhost:5000';

export interface MovieSearchParams {
  search?: string;
  orderBy?: MovieSortType;
}

const createMovie = (movieData: RawMovie): Movie => {
  return {
    ...movieData,
    release_date: new Date(movieData.release_date),
  };
};

export const useMoviesApi = () => {
  const { authToken } = useAuthContext();

  const getMovie = useCallback(async (movieId: string): Promise<Movie | null> => {
    const response = await fetch(`${BASE_URL}/movies/${movieId}`);
      if (!response.ok) {
        // what to do now?
        return null;
      }
      const movieData = await response.json();
      return createMovie(movieData);
  }, []);

  const searchMovies = useCallback(async (searchParams: MovieSearchParams): Promise<MovieResults> => {
    const queryParams = new URLSearchParams(searchParams as Record<string, string>);
    const response = await fetch(`${BASE_URL}/movies?${queryParams}`);
    const { data, total } = await response.json();
    return {
      movies: data.map(createMovie),
      total,
    };
  }, []);

  const deleteMovie = useCallback(async (movieId: string): Promise<boolean> => {
    if (!authToken) {
      throw new Error('Hozzáférés megtagadva');
    }
    const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    return response.ok;
  }, [authToken]);

  const addMovie = useCallback(async (movie: Movie): Promise<Movie> => {
    if (!authToken) {
      throw new Error('Hozzáférés megtagadva');
    }
    const response = await fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message);
    }
    return createMovie(result);
  }, [authToken]);

  const editMovie = useCallback(async (movie: Movie): Promise<Movie> => {
    if (!authToken) {
      throw new Error('Hozzáférés megtagadva');
    }
    const response = await fetch(`${BASE_URL}/movies`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message);
    }
    return createMovie(result);
  }, [authToken]);

  return {
    getMovie,
    searchMovies,
    deleteMovie,
    addMovie,
    editMovie,
  };

};