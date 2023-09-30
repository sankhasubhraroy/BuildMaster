import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Carousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="carousel-container">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={`http://localhost:5000/uploads/${images[imageIndex]}`}
          className="carousel-image"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <motion.button
          whileHover={{ scale: 1.05, opacity: 0.7 }}
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: 0.4 }}
          className="carousel-next"
          onClick={() => paginate(1)}
        >
          <FiChevronRight size={28} />
        </motion.button>
      )}

      {images.length > 1 && (
        <motion.button
          whileHover={{ scale: 1.05, opacity: 0.7 }}
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: 0.4 }}
          className="carousel-prev"
          onClick={() => paginate(-1)}
        >
          <FiChevronLeft size={28} />
        </motion.button>
      )}
    </div>
  );
};

export default Carousel;
