import { useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../../contexts/notificationContext";
import axios from "../../api/axios";
import { useModal } from "../../contexts/modalContext";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import {
  isEmailValid,
  isNameValid,
  isPhoneValid,
  isUsernameValid,
} from "../../utils/validations";

const EditUser = ({ user }) => {
  const [formData, setFormData] = useState({
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    username: user.username,
    phone: user.phone,
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
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle file inputs
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      // For other inputs, update the formData state as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, username, phone } = formData;

      // Client side validations
      if (!isNameValid(name)) {
        handleFailure("Enter a valid name");
        return;
      } else if (!isEmailValid(email)) {
        handleFailure("Enter a valid email");
        return;
      } else if (!isUsernameValid(username)) {
        handleFailure("Enter a valid username");
        return;
      } else if (!isPhoneValid(phone)) {
        handleFailure("Enter a valid phone");
        return;
      }

      const response = await axios.put("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        {/* avatar */}
        <div className="c-p-field c-p-file">
          <label htmlFor="avatar" className="c-p-label">
            select image
          </label>

          <input
            id="avatar"
            className="c-p-file-input"
            type="file"
            name="avatar"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
        </div>

        {/* name */}
        <div className="c-p-field">
          <label htmlFor="name" className="c-p-label">
            name
          </label>

          <input
            id="name"
            className="c-p-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* email */}
        <div className="c-p-field">
          <label htmlFor="email" className="c-p-label">
            email
          </label>

          <input
            id="email"
            className="c-p-input"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* username */}
        <div className="c-p-field">
          <label htmlFor="username" className="c-p-label">
            username
          </label>

          <input
            id="username"
            className="c-p-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* phone */}
        <div className="c-p-field">
          <label htmlFor="phone" className="c-p-label">
            phone
          </label>

          <input
            id="phone"
            className="c-p-input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="c-p-btn"
        >
          submit
        </motion.button>
      </form>
    </div>
  );
};

export default EditUser;
