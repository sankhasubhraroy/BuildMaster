import InputField from "../Auth/InputField";
import axios from "../../api/axios";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useNotification } from "../../contexts/notificationContext";
import { useAdmin } from "../../contexts/adminContext";
import "./index.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({});
  const { addNotification } = useNotification();
  const { login } = useAdmin();

  // Call the notification on success
  const handleSuccess = (message) => {
    addNotification({
      type: "success",
      message: message,
    });
  };

  // Call the notification on failure
  const handleFailure = (message) => {
    addNotification({
      type: "error",
      message: message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, password } = formData;

      // Form validation client side
      if (!username || !password) {
        handleFailure("Invalid username or password");
        return;
      }

      const response = await axios.post(
        "/auth/admin/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response?.status === 200) {
        handleSuccess(response.data.message);
        // Obtaining the JWT token
        const { token } = response.data;
        // Authenticate the user
        login(token);
      }
    } catch (error) {
      if (!error?.response) {
        handleFailure("No server response");
      } else if (error.response?.status === 400) {
        handleFailure(error.response.data.message);
      } else {
        handleFailure("Server issues!!!");
      }
    }
  };

  return (
    <div className="a-login">
      <h1>Admin Login</h1>

      <form className="a-login-form" onSubmit={handleSubmit}>
        <InputField
          label="username"
          type="text"
          name="username"
          icon={<FaUser />}
          formData={formData}
          setFormData={setFormData}
        />

        <InputField
          label="password"
          type="password"
          name="password"
          icon={<FaLock />}
          formData={formData}
          setFormData={setFormData}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="a-login-btn"
        >
          Login
        </motion.button>
      </form>
    </div>
  );
};

export default AdminLogin;
