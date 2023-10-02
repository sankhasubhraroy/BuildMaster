import { useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../../contexts/notificationContext";
import axios from "../../api/axios";
import { useModal } from "../../contexts/modalContext";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { isPasswordValid } from "../../utils/validations";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { addNotification } = useNotification();
  const { closeModal } = useModal();
  const { auth } = useAuth();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { oldPassword, newPassword } = formData;

      // Client side validations
      if (!oldPassword || !newPassword) {
        handleFailure("Please fill all fields");
        return;
      }
      if (!isPasswordValid(newPassword)) {
        handleFailure(
          "Password should be atleast 6 characters one digit and one special character"
        );
        return;
      }
      if (oldPassword === newPassword) {
        handleFailure("Old password and new password cannot be same");
        return;
      }

      const response = await axios.post("/user/password", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });

      if (response?.status === 200) {
        handleSuccess(response.data.message);
        // closing the modal
        closeModal();
        navigate("/profile", { replace: true });
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
    <div className="c-p">
      <h2>Edit Details</h2>

      <form onSubmit={handleSubmit} className="c-p-form">
        {/* oldPassword */}
        <div className="c-p-field">
          <label htmlFor="oldPassword" className="c-p-label">
            Old Password
          </label>

          <input
            id="oldPassword"
            className="c-p-input"
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>

        {/* newPassword */}
        <div className="c-p-field">
          <label htmlFor="newPassword" className="c-p-label">
            New Password
          </label>

          <input
            id="newPassword"
            className="c-p-input"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="c-p-btn"
        >
          update
        </motion.button>
      </form>
    </div>
  );
};

export default UpdatePassword;
