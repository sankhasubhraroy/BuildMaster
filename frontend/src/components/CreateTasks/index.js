import { useState } from "react";
import { useNotification } from "../../contexts/notificationContext";
import { useModal } from "../../contexts/modalContext";
import { useAuth } from "../../contexts/authContext";
import { motion } from "framer-motion";
import "./index.css";
import axios from "../../api/axios";

const CreateTasks = ({ projectId }) => {
  const [formData, setFormData] = useState({
    projectId,
    name: "",
    description: "",
    deadline: "",
    assignees: [],
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

  // Function to handle changes in the main input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle changes in additional input fields
  const handleAdditionalInputChange = (e, index) => {
    const { value } = e.target;
    const updateAssignees = [...formData.assignees];
    updateAssignees[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      assignees: updateAssignees,
    }));
  };

  // Function to add a new additional input field
  const addAdditionalInput = () => {
    setFormData((prevData) => ({
      ...prevData,
      assignees: [...prevData.assignees, ""],
    }));
  };

  // Function to remove an additional input field
  const removeAdditionalInput = (index) => {
    const updateAssignees = [...formData.assignees];
    updateAssignees.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      assignees: updateAssignees,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, deadline } = formData;

      // Client side validations
      if (!name) {
        handleFailure("name is required");
        return;
      } else if (!deadline) {
        handleFailure("provide a deadline");
        return;
      }

      const response = await axios.post("/tasks", formData, {
        headers: {
          "Content-Type": "application/json",
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
    <div className="c-t">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} className="c-t-form">
        <div className="c-t-field">
          <label htmlFor="name" className="c-t-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="c-t-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="c-t-field">
          <label htmlFor="deadline" className="c-t-label">
            deadline
          </label>
          <input
            type="date"
            id="deadline"
            className="c-t-input"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={currentDate}
          />
        </div>

        <div className="c-t-field c-t-textarea">
          <label htmlFor="description" className="c-t-label">
            description
          </label>
          <textarea
            id="description"
            className="c-t-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="c-t-field c-t-field-additional">
          <label className="c-t-label">add assignees</label>

          <button
            type="button"
            className="c-t-add"
            onClick={addAdditionalInput}
          >
            +
          </button>

          <div className="c-t-box-additional">
            {formData.assignees.map((info, index) => (
              <div key={index} className="c-t-additional">
                <input
                  type="text"
                  className="c-t-input"
                  value={info}
                  onChange={(e) => handleAdditionalInputChange(e, index)}
                />
                <button
                  type="button"
                  className="c-t-remove"
                  onClick={() => removeAdditionalInput(index)}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="c-t-btn"
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
};

export default CreateTasks;
