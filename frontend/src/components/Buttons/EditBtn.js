import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import "./index.css";

const EditBtn = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="btn edit-btn"
    >
      <p>{text}</p>
      <FiEdit />
    </motion.button>
  );
};

export default EditBtn;
