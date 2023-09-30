import { motion } from "framer-motion";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./index.css";

const BackBtn = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="btn back-btn"
    >
      <FaArrowLeftLong />
      <p>{text}</p>
    </motion.button>
  );
};

export default BackBtn;
