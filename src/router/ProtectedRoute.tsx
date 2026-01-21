import { Navigate, Outlet } from "react-router";
import { UseAuth } from "../hook/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = UseAuth();

  if (isLoading) {
    return <div>Loading...</div>; // hoặc spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />;
  }

  return <Outlet />;
}
