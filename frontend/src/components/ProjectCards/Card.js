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

const Card = ({ projectId, name, price, description, images }) => {
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
        <img src={`http://localhost:5000/uploads/${images[0]}`} alt="_" />
      </div>

      <div className="project-card-body">
        <p className="project-name">{name}</p>
        <p className="project-price">{"₹ " + price}</p>
        <p className="project-description">
          {description?.length > 200
            ? description.substring(0, 200) + "..."
            : description}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(`/project/${projectId}`)}
        className="project-card-arrow"
      >
        Explore
        <BsFillArrowRightSquareFill size={24} />
      </motion.button>

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
