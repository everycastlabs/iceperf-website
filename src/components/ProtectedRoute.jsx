import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useUserContext } from '../contexts/userContext';

export const ProtectedRoute = ({ children }) => {
  const { isLoading, user } = useUserContext();
  if (!isLoading && !user) {
    return <Navigate to='/login' />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.func,
};
