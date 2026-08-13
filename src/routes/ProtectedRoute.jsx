import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = true;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}
