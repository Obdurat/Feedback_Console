import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const MANAGEMENT_ROLES = ["Director", "Manager", "Team Manager", "Team Lead"];

export const RequireManagement = () => {
  const { user } = useAuth();

  if (!MANAGEMENT_ROLES.includes(user?.role?.name ?? "")) {
    return <Navigate to="/my-feedbacks" replace />;
  }

  return <Outlet />;
};

export const RequireAgent = () => {
  const { user } = useAuth();

  if (MANAGEMENT_ROLES.includes(user?.role?.name ?? "")) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
