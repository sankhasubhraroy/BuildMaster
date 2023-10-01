import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext";
import { useNotification } from "../../contexts/notificationContext";
import CancelBtn from "../Buttons/CancelBtn";
import DeleteBtn from "../Buttons/DeleteBtn";

const DeleteProject = ({ projectId }) => {
  const { closeModal } = useModal();
  const { auth } = useAuth();
  const navigate = useNavigate();
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
      const response = await axios.delete(`/projects/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });

      if (response.status === 200) {
        handleSuccess(response.data.message);
        // closing the modal
        closeModal();
        navigate("/projects", { replace: true });
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
      <h2>Do you want to delete this project?</h2>
      <div className="d-t-btns">
        <CancelBtn text="cancel" onClick={() => closeModal()} />
        <DeleteBtn text="delete" onClick={() => handleDelete()} />
      </div>
    </div>
  );
};

export default DeleteProject;
