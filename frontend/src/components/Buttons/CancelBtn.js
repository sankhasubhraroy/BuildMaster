import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import "./index.css";

const CancelBtn = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="btn cancel-btn"
    >
      <p>{text}</p>
      <FaXmark />
    </motion.button>
  );
};

export default CancelBtn;
