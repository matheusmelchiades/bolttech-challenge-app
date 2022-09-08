import React, { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = useCallback(
    (username, password) => {
      const credentials = btoa(`${username}:${password}`);

      console.log('REQUEST');
      console.log('Authorization: Basic ' + credentials);

      setUser({
        id: new Date().getTime().toString(),
        name: username,
      });
      navigate('/');
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const value = React.useMemo(
    () => ({ user, login, logout }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
