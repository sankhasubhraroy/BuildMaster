import { motion } from "framer-motion";
import { IoTrashBin } from "react-icons/io5";
import "./index.css";

const DeleteBtn = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="btn delete-btn"
    >
      <p>{text}</p>
      <IoTrashBin />
    </motion.button>
  );
};

export default DeleteBtn;
