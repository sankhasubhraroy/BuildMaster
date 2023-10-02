import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const NotRequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return !auth ? (
    <Outlet />
  ) : (
    <Navigate to="/profile" state={{ from: location }} replace />
  );
};

export default NotRequireAuth;
