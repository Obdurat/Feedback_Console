import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const RedirectIfAuthenticated = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
