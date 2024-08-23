import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../session/AuthContext.tsx';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
