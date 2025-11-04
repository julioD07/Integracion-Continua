import { Navigate } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" />;
};
