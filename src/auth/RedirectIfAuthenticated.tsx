import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const MANAGEMENT_ROLES = ["Director", "Manager", "Team Manager", "Team Lead"];

export const RedirectIfAuthenticated = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Outlet />;

  if (MANAGEMENT_ROLES.includes(user?.role?.name ?? "")) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/my-feedbacks" replace />;
};
