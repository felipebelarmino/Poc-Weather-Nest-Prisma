import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth';
import Login from './pages/Login/index.jsx';
import Home from './pages/Home/index.jsx';

function AppRoutes() {
  function PrivateRoute({ children }) {
    const { authenticated } = useContext(AuthContext);
    if (!authenticated) return <Navigate to='/login' />;
    return children;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route exact path='login' element={<Login />} />
          <Route
            exact
            path='home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
