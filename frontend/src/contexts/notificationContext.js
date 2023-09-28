import React, { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";
import { AnimatePresence } from "framer-motion";
import "../components/Notification/index.css";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Function to add a notification
  const addNotification = (notification) => {
    const newNotification = { ...notification, id: Date.now() };
    setNotifications([...notifications, newNotification]);
  };

  // Function to remove a notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      <ul className="notification-area">
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </AnimatePresence>
      </ul>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
