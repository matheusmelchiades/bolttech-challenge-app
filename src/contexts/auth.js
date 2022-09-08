import React, { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = useCallback((username, password) => {
    const credentials = btoa(`${username}:${password}`);

    console.log('REQUEST');
    console.log('Authorization: Basic ' + credentials);

    setUser({
      username,
    });
    navigate('/');
  }, [navigate]);

  const value = React.useMemo(() => ({ user, login }), [login, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
