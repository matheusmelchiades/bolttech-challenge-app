import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('You must use useAuth hook inside the Providers');
  }

  return context;
};
