import React, { createContext, useState, useEffect } from 'react';
import { api, createSession } from '../services/api';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRecord = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userRecord && token) {
      setUser(JSON.parse(userRecord));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    console.log('response', response);

    const loggedUser = {
      id: response.id,
      name: response.name,
      email: response.email,
    };

    console.log(loggedUser);

    const token = response.access_token;

    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('token', token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(loggedUser);
    navigate('/home');

    console.log('login', response);
  };
  
  const logout = () => {
    api.defaults.headers.Authorization = null;
    console.log('logout');

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: Boolean(user), loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
