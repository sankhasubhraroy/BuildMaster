import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import "./index.css";

const UploadBtn = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="btn upload-btn"
    >
      <p>{text}</p>
      <FiUpload />
    </motion.button>
  );
};

export default UploadBtn;
