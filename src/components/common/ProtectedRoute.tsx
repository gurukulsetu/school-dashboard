import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredScope: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredScope }) => {
  const { user } = useAuth();
//   if (!user || !user.scopes?.includes(requiredScope)) {
//     return <Navigate to="/permission-demo" replace />;
//   }
  return children;
};

export default ProtectedRoute;
