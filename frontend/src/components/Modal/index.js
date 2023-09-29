import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useModal } from "../../contexts/modalContext";
import "./index.css";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: "easeIn",
      duration: 0.15,
    },
  },
};

const Modal = () => {
  const { modalContent, closeModal } = useModal();

  return (
    <Backdrop onClick={closeModal}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="modal"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={closeModal}
          className="modal-close"
        >
          <IoClose size={18} />
        </motion.button>

        <div className="modal-content">{modalContent}</div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
