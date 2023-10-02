import { motion } from "framer-motion";

const Card = ({ heading, count, logo, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="d-card"
      onClick={onClick}
    >
      <h1>{heading}</h1>

      <div className="d-logo">{logo}</div>

      <p>{count}</p>
    </motion.div>
  );
};

export default Card;
