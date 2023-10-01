import { useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../../contexts/notificationContext";
import axios from "../../api/axios";
import { useModal } from "../../contexts/modalContext";
import { useAuth } from "../../contexts/authContext";

const EditProject = ({ projectId, data }) => {
  const [formData, setFormData] = useState({
    projectId,
    name: data.name,
    description: data.description,
    country: data.location?.country || "",
    state: data.location?.state || "",
    city: data.location?.city || "",
    pincode: data.location?.pincode || "",
    price: data.price,
    startDate: data.startDate?.split("T")[0] || "",
    endDate: data.endDate?.split("T")[0] || "",
    status: data.status,
    image: {},
  });

  let currentDate = new Date();
  currentDate = currentDate.toISOString().split("T")[0];
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
      const { name, pincode, price, startDate, endDate, image } = formData;

      // Client side validations
      if (!name) {
        handleFailure("Name is required");
        return;
      } else if (!price) {
        handleFailure("Price is required");
        return;
      } else if (!startDate || !endDate) {
        handleFailure("Date is required");
        return;
      } else if (!price) {
        handleFailure("price is required");
        return;
      } else if (!image) {
        handleFailure("Upload at least one image");
      } else if (!pincode) {
        handleFailure("pincode is required");
        return;
      }

      const response = await axios.put("/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: auth,
        },
      });

      if (response?.status === 200) {
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
    <div className="c-p">
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit} className="c-p-form">
        {/* name */}
        <div className="c-p-field">
          <label htmlFor="name" className="c-p-label">
            name of the project
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

        {/* country */}
        <div className="c-p-field">
          <label htmlFor="country" className="c-p-label">
            country
          </label>

          <input
            id="country"
            className="c-p-input"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* state */}
        <div className="c-p-field">
          <label htmlFor="state" className="c-p-label">
            state
          </label>

          <input
            id="state"
            className="c-p-input"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        {/* city */}
        <div className="c-p-field">
          <label htmlFor="city" className="c-p-label">
            city
          </label>

          <input
            id="city"
            className="c-p-input"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* pincode */}
        <div className="c-p-field">
          <label htmlFor="pincode" className="c-p-label">
            pincode
          </label>

          <input
            id="pincode"
            className="c-p-input"
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        {/* price */}
        <div className="c-p-field">
          <label htmlFor="price" className="c-p-label">
            price
          </label>

          <input
            id="price"
            className="c-p-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* startDate */}
        <div className="c-p-field">
          <label htmlFor="startDate" className="c-p-label">
            starting date
          </label>

          <input
            id="startDate"
            className="c-p-input"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            min={currentDate}
          />
        </div>

        {/* endDate */}
        <div className="c-p-field">
          <label htmlFor="endDate" className="c-p-label">
            end date
          </label>

          <input
            id="endDate"
            className="c-p-input"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={currentDate}
          />
        </div>

        {/* status */}
        <div className="c-p-field">
          <label htmlFor="status" className="c-p-label">
            status
          </label>

          <select
            id="status"
            className="c-p-input"
            name="status"
            onClick={handleChange}
          >
            <option value="planned">planned</option>
            <option value="ongoing">ongoing</option>
            <option value="completed">completed</option>
          </select>
        </div>

        {/* image */}
        <div className="c-p-field c-p-file">
          <label htmlFor="image" className="c-p-label">
            select image
          </label>

          <input
            id="image"
            className="c-p-file-input"
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
        </div>

        {/* description */}
        <div className="c-p-field c-p-textarea">
          <label htmlFor="description" className="c-p-label">
            description
          </label>

          <textarea
            id="description"
            className="c-p-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
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

export default EditProject;
