import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./contexts/notificationContext";
import { ModalProvider } from "./contexts/modalContext";
import { AuthProvider } from "./contexts/authContext";
import { AdminProvider } from "./contexts/adminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <NotificationProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </NotificationProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
