import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import "./index.css";
import UploadBtn from "../Buttons/UploadBtn";
import axios from "../../api/axios";
import { useNotification } from "../../contexts/notificationContext";
import { useModal } from "../../contexts/modalContext";
import { useAuth } from "../../contexts/authContext";

const UploadBlueprint = ({ projectId }) => {
  const [formData, setFormData] = useState({
    projectId,
    name: "",
    blueprint: null,
  });

  const { addNotification } = useNotification();
  const { closeModal } = useModal();
  const { auth } = useAuth();

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
      const { name, blueprint } = formData;

      // client side validations
      if (!name) {
        handleFailure("File name is required");
        return;
      } else if (!blueprint) {
        handleFailure("Upload a blueprint");
        return;
      }

      const response = await axios.post("/blueprints", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: auth,
        },
      });

      if (response?.status === 201) {
        handleSuccess(response.data.message);
        // closing the modal
        closeModal();
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
    <div className="u-bp">
      <form className="u-bp-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="u-bp-text">
          file name
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="blueprint" className="u-bp-label">
          <FiUpload size={28} color="white" />
          <input
            id="blueprint"
            className="u-bp-input"
            type="file"
            hidden
            name="blueprint"
            accept=".pdf"
            onChange={handleChange}
          />
        </label>

        <div className="u-bp-btn">
          <UploadBtn text="upload" />
        </div>
      </form>
    </div>
  );
};

export default UploadBlueprint;
