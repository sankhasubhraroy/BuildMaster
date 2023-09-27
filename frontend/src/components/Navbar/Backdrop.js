import { motion } from "framer-motion";

// Variants for backdrop
const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.5 } },
};

const Backdrop = ({ onClick }) => {
  return (
    <motion.div
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
      className="backdrop"
    ></motion.div>
  );
};

export default Backdrop;
