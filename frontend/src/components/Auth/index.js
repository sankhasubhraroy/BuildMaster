import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import InputField from "./InputField";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa6";
import "./index.css";
import axios from "../../api/axios";
import { useNotification } from "../../contexts/notificationContext";
import { LOGIN_URL, REGISTER_URL } from "../../utils/constants";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isPhoneValid,
} from "../../utils/validations";
import { useAuth } from "../../contexts/authContext";
import PageHeader from "../PageHeader";

const Auth = () => {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({});
  const { addNotification } = useNotification();
  const { login } = useAuth();

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

    try {
      // REGISTER
      if (formType === "register") {
        const { name, email, phone, password, confirmPassword } = formData;

        // Form validations client-side
        if (Object.keys(formData).length === 0) {
          handleFailure("Please fill all the fields");
          return;
        } else if (!isNameValid(name)) {
          handleFailure("Enter a valid name");
          return;
        } else if (!isEmailValid(email)) {
          handleFailure("Enter a valid email");
          return;
        } else if (!isPhoneValid(phone)) {
          handleFailure("Enter a valid phone number");
          return;
        } else if (!isPasswordValid(password)) {
          handleFailure(
            "Password must contain at least 8 characters, one letter, one number and a special character"
          );
          return;
        } else if (password !== confirmPassword) {
          handleFailure("Password should be same with confirm password");
          return;
        }

        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({ name, email, phone, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response?.status === 200) {
          handleSuccess(response.data.message);

          // Obtaining the JWT token
          const { token } = response.data;
          // Authenticate the user
          login(token);
        }
      }

      // LOGIN
      if (formType === "login") {
        const { email, password } = formData;

        // Form validations client-side
        if (!email || !password) {
          handleFailure("Fill all the fields");
          return;
        }

        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response?.status === 200) {
          handleSuccess(response.data.message);

          // Obtaining the JWT token
          const { token } = response.data;
          // Authenticate the user
          login(token);
        }
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
    <>
      <PageHeader heading={formType} />
      <div className="auth">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-section">
            <AnimatePresence>
              {formType === "register" && (
                <InputField
                  label="full name"
                  type="text"
                  name="name"
                  icon={<FaUser />}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </AnimatePresence>

            <InputField
              label="email id"
              type="email"
              name="email"
              icon={<FaEnvelope />}
              formData={formData}
              setFormData={setFormData}
            />

            <AnimatePresence>
              {formType === "register" && (
                <InputField
                  label="phone no"
                  type="tel"
                  name="phone"
                  icon={<FaPhone />}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </AnimatePresence>

            <InputField
              label="password"
              type="password"
              name="password"
              icon={<FaLock />}
              formData={formData}
              setFormData={setFormData}
            />

            <AnimatePresence>
              {formType === "register" && (
                <InputField
                  label="confirm password"
                  type="password"
                  name="confirmPassword"
                  icon={<FaLock />}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="form-btn"
          >
            {formType}
          </motion.button>

          {formType === "login" && (
            <p className="form-redirect">
              Don't have an account,{" "}
              <span
                onClick={() => setFormType("register")}
                className="redirect-highlight"
              >
                Register here
              </span>
            </p>
          )}

          {formType === "register" && (
            <p className="form-redirect">
              Already have an account,{" "}
              <span
                onClick={() => setFormType("login")}
                className="redirect-highlight"
              >
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Auth;
