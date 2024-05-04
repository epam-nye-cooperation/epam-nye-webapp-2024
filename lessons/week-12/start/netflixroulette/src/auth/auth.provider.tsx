import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { AuthContext, AuthContextProvider, User } from './auth.context';
import { useNavigate } from 'react-router-dom';
import { useMoviesApi } from '../state/use-movies-api';

const AUTH_KEY = 'moviesApiAuthToken';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage(AUTH_KEY, '');
  const [user, setUser] = useState<User | null>(null);
  const [inProgress, setInprogress] = useState(!!authToken);
  const navigate = useNavigate();
  const { login: createLoginToken, getUserProfile } = useMoviesApi();

  const login: AuthContext['login'] = useCallback(
    async (username: string, password: string) => {
      try {
        setInprogress(true);
        const authToken = await createLoginToken(username, password);
        setAuthToken(authToken);
      } catch (error) {
        setInprogress(false);
        return (error as Error)?.message;
      }
    },
    [setAuthToken]
  );

  const logout: AuthContext['logout'] = useCallback(
    () => {
      removeAuthToken();
      navigate('/');
    },
    [navigate, removeAuthToken]
  );

  const state: AuthContext = useMemo(() => ({
    login,
    logout,
    authToken,
    user,
    inProgress,
  }), [login, logout, user, inProgress, authToken]);

  useEffect(
    () => {
      if (!authToken) {
        setUser(null);
        return;
      }
      (async () => {
        setInprogress(true);
        try {
          const userProfile = await getUserProfile(authToken);
          setUser(userProfile);
        } catch (error) {
          removeAuthToken();
        } finally {
          setInprogress(false);
        }
      })();
    },
    [authToken, setAuthToken]
  );

  return (
    <AuthContextProvider value={state}>
      {children}
    </AuthContextProvider>
  );
};
