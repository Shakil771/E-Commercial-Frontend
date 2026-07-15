import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

/**
 * Redirects already-authenticated users away from auth pages (login/register).
 */
const PublicRoute = () => {
  const { isAuthenticated, initializing } = useAuth();

  if (!initializing && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
