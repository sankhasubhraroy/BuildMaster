import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Variants for underline
const underlineVariants = {
  rest: {
    width: "0%",
  },
  active: {
    width: "100%",
  },
};

const Card = ({ icon, text, accent, route }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

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
      onClick={() => navigate(route)}
      className="p-card"
    >
      <div className="p-card-icon" style={{ color: accent }}>
        {icon}
      </div>

      <p className="p-card-text">{text}</p>

      <FaArrowRightLong size={24} color={accent} />

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
