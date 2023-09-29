import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import "./index.css";

const CreateBtn = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="btn create-btn"
    >
      <p>{text}</p>
      <FaPlus />
    </motion.button>
  );
};

export default CreateBtn;
