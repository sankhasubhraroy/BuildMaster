import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdmin } from "../../contexts/adminContext";

const NotRequireAdmin = () => {
  const { admin } = useAdmin();
  const location = useLocation();

  return !admin ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/dashboard" state={{ from: location }} replace />
  );
};

export default NotRequireAdmin;
