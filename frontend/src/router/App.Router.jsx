import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useUserStore from '../stores/userStore';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/home/Home.jsx';
import Login from '../pages/login/Login.jsx';
import Register from '../pages/register/Register.jsx';
import Stats from '../pages/stats/Stats.jsx';

function AppRouter() {
  const { user } = useUserStore();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" />} 
      />

      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/" />} 
      />

      {/* <Route path="/projects/:id" element={<ProjectDetails />} /> */}

      <Route
        path="/stats"
        element={
          <PrivateRoute requiredRole="admin">
            <Stats />
          </PrivateRoute>
        }
      />

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
