import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};
