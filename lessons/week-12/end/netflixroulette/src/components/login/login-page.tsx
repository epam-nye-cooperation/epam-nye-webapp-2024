import { FC, useCallback, useState } from 'react';
import { useAuthContext } from '../../auth/auth.context';
import { LoginForm } from './login-form';
import { useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const onLogin = useCallback(async (username: string, password: string): Promise<boolean> => {
    const error = await login(username, password);
    if (error) {
      setError(error);
      return false;
    }
    navigate('/profile');
    return true;
  }, [setError, navigate, login]);

  return <LoginForm onLogin={onLogin} errorMessage={error} />;
};
