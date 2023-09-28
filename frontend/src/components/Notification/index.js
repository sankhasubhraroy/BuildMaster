import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../../contexts/notificationContext";
import { CloseButton } from "./closeButton";

// Variants for notification body
const notificationVariants = {
  appear: { opacity: 0, y: 50, scale: 0.3 },
  animate: { opacity: 1, y: 0, scale: 1 },
  close: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

// Variants for underline
const underlineVariants = {
  rest: {
    width: "0%",
  },
  active: {
    width: "100%",
  },
};

const Notification = ({ notification }) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Remove the notification after a timeout
      removeNotification(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);

  return (
    <motion.li
      key={notification.id}
      variants={notificationVariants}
      initial="appear"
      animate="animate"
      exit="close"
      className="notification"
      style={
        notification.type === "success"
          ? { backgroundColor: "green" }
          : { backgroundColor: "red" }
      }
    >
      <CloseButton close={() => removeNotification(notification.id)} />
      <p className="notification-content">{notification.message}</p>
      <motion.div
        initial="active"
        animate="rest"
        transition={{ duration: 5 }}
        variants={underlineVariants}
        className="notification-underline"
      ></motion.div>
    </motion.li>
  );
};

export default Notification;
