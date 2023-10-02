import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";

// Variants for underline
const underlineVariants = {
  rest: {
    width: "0%",
  },
  active: {
    width: "100%",
  },
};

const Card = ({ icon, text, accent, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleHoverStart = () => {
    setIsActive(true);
  };

  const handleHoverEnd = () => {
    setIsActive(false);
  };

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-card"
    >
      <div className="p-card-icon" style={{ color: accent }}>
        {icon}
      </div>

      <p className="p-card-text">{text}</p>

      <FaArrowRightLong
        size={24}
        color={accent}
        style={{ position: "absolute", left: "2rem", bottom: "2rem" }}
      />

      <motion.div
        variants={underlineVariants}
        initial={false}
        animate={isActive ? "active" : "rest"}
        className="p-card-underline"
        style={{ backgroundColor: accent }}
      ></motion.div>
    </motion.div>
  );
};

export default Card;
