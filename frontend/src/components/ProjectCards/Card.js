import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

// Variants for underline
const underlineVariants = {
  rest: {
    width: "0%",
  },
  active: {
    width: "100%",
  },
};

const Card = ({ url, name, description, route }) => {
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
      className="project-card"
    >
      <div className="project-card-header">
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
          alt="_"
        />
      </div>

      <div className="project-card-body">
        <p className="project-name">{name}</p>
        <p className="project-description">
          {description?.length > 200
            ? description.substring(0, 200) + "..."
            : description}
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(route)}
        className="project-card-arrow"
      >
        <BsFillArrowRightSquareFill size={24} color="#e5d283" />
      </motion.div>

      <motion.div
        variants={underlineVariants}
        initial={false}
        animate={isActive ? "active" : "rest"}
        className="project-card-underline"
      ></motion.div>
    </motion.div>
  );
};

export default Card;
