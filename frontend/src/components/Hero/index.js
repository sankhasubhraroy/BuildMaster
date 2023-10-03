import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-blur"></div>
      <div className="hero-content">
        <h1>Welcome to BuildMaster</h1>
        <p>Your Trusted Solution for Construction Project Management</p>
        <Link to="/auth">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-button"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
