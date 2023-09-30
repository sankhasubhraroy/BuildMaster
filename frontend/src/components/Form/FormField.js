import { motion } from "framer-motion";
import { useRef, useState } from "react";

// Variants for labels
const labelVariants = {
  rest: {
    opacity: 0.4,
    top: 30,
    left: 10,
    fontSize: "16px",
  },
  active: {
    opacity: 1,
    top: 5,
    left: 0,
    fontSize: "12px",
  },
};

const FormField = ({ label, name, type, value, onChange, width }) => {
  const id = label?.toLowerCase().replace(" ", "-");
  const inputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // Function to make animation active when input is focused
  const handleFocus = () => {
    setIsActive(true);
  };

  // Function to make animations inactive when input is out of focus and empty
  const handleBlur = () => {
    if (inputRef?.current.value === "") {
      setIsActive(false);
    }
  };

  return (
    <div className="form-field" style={{ width: width }}>
      <motion.label
        htmlFor={id}
        initial={false}
        animate={isActive ? "active" : "rest"}
        variants={labelVariants}
        className="form-label"
      >
        {label}
      </motion.label>

      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="form-input"
      />
    </div>
  );
};

export default FormField;
