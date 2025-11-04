import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const user = useAuth();

  return user ? <Navigate to="/login" /> : <>{children}</>;
};
