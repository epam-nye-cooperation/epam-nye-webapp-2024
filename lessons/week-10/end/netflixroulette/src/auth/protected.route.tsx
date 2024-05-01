import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAuthContext } from './auth.context';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user, inProgress } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !inProgress) {
      navigate('/login');
    }
  }, [navigate, user, inProgress]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
