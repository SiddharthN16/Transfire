import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) return children;

  return <Navigate replace to="/login" />;
};

export default AuthRoute;
