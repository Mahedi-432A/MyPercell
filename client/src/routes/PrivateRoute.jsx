import React from 'react'
import useAuth from '../hooks/useAuth'
import KissLoader from '../pages/Shared/Loader/KissLoader';
import { Navigate } from 'react-router';

const PrivateRoute = ({Children}) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <KissLoader></KissLoader>;
    }

    if (!user) {
      <Navigate to="/login"></Navigate>;
    }

  return Children;
}

export default PrivateRoute;