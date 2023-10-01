import axios from "../../api/axios";
import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext";
import { useNotification } from "../../contexts/notificationContext";
import CancelBtn from "../Buttons/CancelBtn";
import DeleteBtn from "../Buttons/DeleteBtn";
import "./index.css";

const DeleteTask = ({ taskId }) => {
  const { closeModal } = useModal();
  const { auth } = useAuth();
  const { addNotification } = useNotification();

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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });

      if (response.status === 200) {
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
    <div className="d-t">
      <h2>Do you want to delete this task?</h2>
      <div className="d-t-btns">
        <CancelBtn text="cancel" onClick={() => closeModal()} />
        <DeleteBtn text="delete" onClick={() => handleDelete()} />
      </div>
    </div>
  );
};

export default DeleteTask;
