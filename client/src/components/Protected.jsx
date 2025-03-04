import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth); // Get authentication state

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
