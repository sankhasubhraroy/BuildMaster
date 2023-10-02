import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      axios.defaults.headers.common["Authorization"] = admin;
      localStorage.setItem("admin", admin);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("admin");
    }
  }, [admin]);

  const login = (token) => {
    setAdmin(token);
    localStorage.setItem("admin", token);
    axios.defaults.headers.common["Authorization"] = admin;
    navigate("/admin/dashboard", { replace: true });
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/admin/login", { replace: true });
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
