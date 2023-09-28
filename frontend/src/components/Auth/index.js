import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import InputField from "./InputField";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa6";
import "./index.css";

const Auth = () => {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="form-heading">{formType}</h1>

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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
  );
};

export default Auth;
