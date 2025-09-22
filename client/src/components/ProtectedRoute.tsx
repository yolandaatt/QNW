import { Navigate } from 'react-router-dom';
import React from 'react';

interface Props {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch {
    console.error('Invalid token format');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
