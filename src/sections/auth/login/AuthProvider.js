import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import jwt from 'jwt-decode';
import { baseUrl } from '../../../config';

axios.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem(window.location.origin);
    if (jwtToken !== null) {
      config.headers.Authorization = jwtToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = async (username, password) => {
    const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
      username,
      password,
    });
    console.log('response = ', response);
    const jwtToken = response.data.token;

    localStorage.setItem(window.location.origin, jwtToken);

    const decodeJwt = jwt(jwtToken);

    setUser(decodeJwt);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem(window.location.origin);

    if (jwtToken !== null && user === null) {
      const decoded = jwt(jwtToken);

      setUser(decoded);
    }

    setLoading(false);
  }, [user]);

  const logout = () => {
    localStorage.clear(window.location.origin);
    setUser(null);
  };

  const contextValue = useMemo(() => {
    return {
      loggedInuser: user,
      login,
      logout,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      <>
        {loading && <div>Application loading...</div>}
        {loading === false && <>{children}</>}
      </>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
