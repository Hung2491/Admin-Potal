import { Navigate, Outlet } from "react-router";
import { UseAuth } from "../hook/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = UseAuth();

  if (!isAuthenticated) {
    return <Navigate to="/SignIn" replace />;
  }

  return <Outlet />;
}
