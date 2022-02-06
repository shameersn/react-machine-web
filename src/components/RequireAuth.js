import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/auth';

function RequireAuth({children}) {
  const location = useLocation();
  const auth = useAuth();

  if(!auth?.user) {
    return <Navigate to="/login" state={location.pathname} />
  }

  return <div>{children}</div>;
}

export default RequireAuth;
