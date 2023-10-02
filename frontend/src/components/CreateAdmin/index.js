import InputField from "../Auth/InputField";
import axios from "../../api/axios";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useNotification } from "../../contexts/notificationContext";
import { useAdmin } from "../../contexts/adminContext";
import { useModal } from "../../contexts/modalContext";
import Secret from "../Secret";
// import "./index.css";

const CreateAmin = () => {
  const [formData, setFormData] = useState({});
  const { addNotification } = useNotification();
  const { admin } = useAdmin();
  const { openModal } = useModal();

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
    openModal(<Secret />);
    return;

    try {
      const { name } = formData;

      // Form validation client side
      if (!name) {
        handleFailure("Invalid name");
        return;
      }

      const response = await axios.post(
        "/auth/admin/create",
        JSON.stringify({ name }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: admin,
          },
        }
      );

      if (response?.status === 200) {
        handleSuccess(response.data.message);
        // Opening a one-time modal
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
      <h1>Create Admin</h1>

      <form className="a-login-form" onSubmit={handleSubmit}>
        <InputField
          label="full name"
          type="text"
          name="name"
          icon={<FaUser />}
          formData={formData}
          setFormData={setFormData}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="a-login-btn"
        >
          Create
        </motion.button>
      </form>
    </div>
  );
};

export default CreateAmin;
