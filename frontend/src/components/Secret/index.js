import { FaRegCopy } from "react-icons/fa6";
import { useNotification } from "../../contexts/notificationContext";
import "./index.css";

const Secret = ({ secret }) => {
  const { addNotification } = useNotification();

  // Call the notification on success
  const handleSuccess = (message) => {
    addNotification({
      type: "success",
      message: message,
    });
  };

  // Function for text copy
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    handleSuccess("Text copied");
  };

  return (
    <div className="secret-box">
      <h3>This is one time details, save it securely</h3>

      <div className="s-field">
        <label htmlFor="username">Username</label>
        <input type="text" disabled value="username" />
        <button className="s-btn" onClick={() => copyToClipboard("username")}>
          <FaRegCopy />
        </button>
      </div>

      <div className="s-field">
        <label htmlFor="password">Password</label>
        <input type="text" disabled value="password" />
        <button className="s-btn" onClick={() => copyToClipboard("password")}>
          <FaRegCopy />
        </button>
      </div>
    </div>
  );
};

export default Secret;
