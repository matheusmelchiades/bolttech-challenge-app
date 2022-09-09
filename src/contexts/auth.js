import { useToast } from '@chakra-ui/react';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);

  const login = useCallback(
    async (username, password) => {
      const { data, error } = await authService.login(username, password);

      if (!error && data) {
        setUser(data.user);
        navigate('/');
      } else {
        toast({
          title: 'Error on signin!',
          description: error,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    },
    [navigate, toast]
  );

  const register = useCallback(async (username, password) => {
    const { data, error } = await authService.register(username, password);

    if (!error && data) {
      navigate('/login');
      toast({
        title: 'created with success!',
        description: error,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error create a user!',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [navigate, toast]);

  const logout = useCallback(() => {
    setUser(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  const value = React.useMemo(
    () => ({ user, login, logout, register }),
    [login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
