import { useAdmin } from "../../contexts/adminContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const { admin } = useAdmin();
  const location = useLocation();

  return admin ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default AdminRoute;
