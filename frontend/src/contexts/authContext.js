import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to set user data
  const setUserWithToken = useCallback(
    (token) => {
      // Decode the token
      const decodedToken = jwtDecode(token);
      // Check token expiration
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired, log the user out
        logout();
        return;
      }

      axios
        .get(`/user/${decodedToken.id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          logout();
        });
    },
    [setUser]
  );

  useEffect(() => {
    // Check for a token in local storage on initial load
    const token = localStorage.getItem("token");

    if (token) {
      setUserWithToken(token);
    }
  }, [setUserWithToken]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUserWithToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    // Check for authentication on route changes
    const token = localStorage.getItem("token");

    if (!token && location.pathname === "/profile") {
      navigate("/auth");
    } else if (token && location.pathname === "/auth") {
      navigate("/profile");
    }
  }, [navigate, location]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
