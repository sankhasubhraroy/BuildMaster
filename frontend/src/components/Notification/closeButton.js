import { motion } from "framer-motion";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const CloseButton = ({ close }) => (
  <motion.button
    onClick={close}
    animate={{ opacity: 0.7 }}
    whileHover={{ opacity: 1, backgroundColor: "#f0f0f02a" }}
    whileTap={{ scale: 0.9 }}
    className="notification-close"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path d="M 3 16.5 L 17 2.5" />
      <Path d="M 3 2.5 L 17 16.346" />
    </svg>
  </motion.button>
);
