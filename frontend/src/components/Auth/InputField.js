import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Variants for Input Fields
const inputVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      ease: "easeIn",
      duration: 0.15,
    },
  },
};

// Variants for labels
const labelVariants = {
  rest: {
    opacity: 0.4,
    top: 30,
    left: 40,
    fontSize: "16px",
  },
  active: {
    opacity: 1,
    top: 5,
    left: 0,
    fontSize: "12px",
  },
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

const InputField = ({ label, type, name, icon, formData, setFormData }) => {
  const id = label?.replace(" ", "-");
  const [inputValue, setInputValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Function to update the input value after each key stroke
  const handleChange = (e) => {
    setInputValue(e.target.value);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to make animation active when input is focused
  const handleFocus = () => {
    setIsActive(true);
  };

  // Function to make animations inactive when input is out of focus and empty
  const handleBlur = () => {
    if (inputValue === "") {
      setIsActive(false);
    }
  };

  // Function to toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      variants={inputVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="input-field"
    >
      <motion.label
        htmlFor={id}
        initial={false}
        animate={isActive ? "active" : "rest"}
        variants={labelVariants}
        className="input-label"
      >
        {label}
      </motion.label>

      <motion.input
        type={showPassword ? "text" : type}
        id={id}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="input-box"
      />

      {type === "password" && (
        <div onClick={togglePasswordVisibility} className="password-toggle">
          {!showPassword && <AiOutlineEyeInvisible />}
          {showPassword && <AiOutlineEye />}
        </div>
      )}

      <div
        className="input-icon"
        style={isActive ? { color: "blueviolet" } : {}}
      >
        {icon}
      </div>

      <div className="input-underline"></div>

      <motion.div
        initial={false}
        animate={isActive ? "active" : "rest"}
        variants={underlineVariants}
        className="animated-underline"
      ></motion.div>
    </motion.div>
  );
};

export default InputField;
