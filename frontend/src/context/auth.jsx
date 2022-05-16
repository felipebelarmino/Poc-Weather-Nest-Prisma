import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (password === 'senha') {
      setUser({ id: 1, email });
      navigate('/home');
    }

    const loggedUser = {
      id: 1,
      email,
    };

    localStorage.setItem('user', JSON.stringify(loggedUser));

    console.log('login', { email, password });
  };
  const logout = () => {
    setUser(null);
    navigate('/login');
    console.log('logout');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: Boolean(user), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
