import React, { createContext, useEffect } from 'react';
import useLocalStorage from '../../services/useLocalStorage';
import API from '../../services/API';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [userLogged, setUserLogged] = useLocalStorage('user');

  useEffect(() => {
    setUserLogged(null);
    API.get('/me').then((res) => setUserLogged(res.data));
  }, []);

  return (
    <LoginContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </LoginContext.Provider>
  );
}
