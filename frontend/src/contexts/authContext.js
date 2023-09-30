import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common["Authorization"] = auth;
      localStorage.setItem("token", auth);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [auth]);

  const login = (token) => {
    setAuth(token);
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = auth;
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
