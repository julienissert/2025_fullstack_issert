import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../stores/userStore';

function PrivateRoute({ children, requiredRole }) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
