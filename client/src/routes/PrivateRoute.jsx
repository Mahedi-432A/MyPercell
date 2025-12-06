import React from 'react'
import useAuth from '../hooks/useAuth'
import KissLoader from '../pages/Shared/Loader/KissLoader';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <KissLoader></KissLoader>;
    }

    if (!user) {
      return <Navigate to="/login"></Navigate>;
    }

  return children;
}

export default PrivateRoute;