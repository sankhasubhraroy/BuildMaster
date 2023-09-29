import { useAccordion } from "../../contexts/accordionContext";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";
import "./index.css";

// Variants for arrow
const arrowVariants = {
  rest: { y: "-50%", rotate: 0 },
  active: { y: "-50%", rotate: 180 },
};

export const AccordionItem = ({ children }) => {
  return <div className="accordion-item">{children}</div>;
};

export const AccordionHeader = ({ children }) => {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`accordion-header ${isActive ? "active" : ""}`}
      onClick={() => onChangeIndex(index)}
    >
      {children}
      <motion.div
        variants={arrowVariants}
        animate={isActive ? "rest" : "active"}
        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        className="accordion-header-arrow"
      >
        <FiChevronUp size={20} />
      </motion.div>
    </motion.div>
  );
};

export const AccordionPanel = ({ children }) => {
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        >
          <div className="accordion-panel">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
