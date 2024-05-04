import { useCallback } from 'react';
import { Movie, MovieSortType, RawMovie } from '../models';
import { MovieResults } from './movie-state';
import { User } from '../auth/auth.context';

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

  const login = useCallback(async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error(response.status === 400 ? 'Hibás adatok' : 'Hibás felhasználónév vagy jelszó!');
    }
    const result = await response.json();
    return result.accessToken;
  }, []);

  const getUserProfile = useCallback(
    async (authToken: string): Promise<User> => {
      const response = await fetch(`${BASE_URL}/user`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (!response.ok) {
        throw new Error('Érvénytelen token');
      }
      return response.json();
    },
    []
  );

  const deleteMovie = useCallback(async (movieId: string, authToken: string): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    return response.ok;
  }, []);

  return {
    login,
    getUserProfile,
    getMovie,
    searchMovies,
    deleteMovie,
  };

};