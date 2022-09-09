import { useToast } from '@chakra-ui/react';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import authService from '../services/auth';
import localStorageService from '../services/localstorage';

export const AuthContext = createContext(null);

const pathStorage = {
  user: 'userAuth',
  token: 'token',
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback(
    async (username, password) => {
      const { data, error } = await authService.login(username, password);

      if (!error && data) {
        setUser(data.user);
        setToken(data.token);
        localStorageService.save(pathStorage.user, data.user);
        localStorageService.save(pathStorage.token, data.token);
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

  const register = useCallback(
    async (username, password) => {
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
    },
    [navigate, toast]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorageService.clean(pathStorage.user, null);
    localStorageService.clean(pathStorage.token, null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const userAuth = localStorageService.load(pathStorage.user);
    const userToken = localStorageService.load(pathStorage.token);

    if (userAuth) setUser(userAuth);
    if (userToken) {
      api.applyToken(userToken);
      setToken(userToken);
    }
  }, []);

  useEffect(() => {
    if (!['/login', '/register'].includes(location.pathname)) {
      if (user && user.id && token && location.pathname !== '/') navigate('/');
      if (!user || !token) navigate('/login');
    }
  }, [navigate, token, user]);

  const value = React.useMemo(
    () => ({ user, login, logout, register }),
    [login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
