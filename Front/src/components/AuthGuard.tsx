import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};