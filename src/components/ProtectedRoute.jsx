import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '../contexts/userContext';

export const ProtectedRoute = ({ children }) => {
  const { isLoading, user } = useContext(UserContext);
  if (!isLoading && !user) {
    return <Navigate to='/login' />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.func,
};
