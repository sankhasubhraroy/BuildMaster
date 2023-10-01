import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";
import Hamburger from "./Hamburger";
import { navLinks } from "../../utils/constants";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Backdrop from "./Backdrop";
import "./index.css";
import { useAuth } from "../../contexts/authContext";

// Variants for mobile navbar
const sidebarVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 60,
    },
  },
  closed: {
    opacity: 0,
    x: "-100%",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

// Variants for mobile navigation menu
const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Variants for mobile menu-items
const linkVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// Framer Motion swipe power
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  const isTablet = useMediaQuery("(max-width: 768px)");
  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { auth } = useAuth();

  // changing the scrollY value as per page scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollY(latest);
  });

  return (
    <>
      <header
        ref={navRef}
        className="navbar"
        style={
          isTablet || scrollY > 0
            ? { position: "fixed" }
            : { position: "absolute" }
        }
      >
        <motion.nav
          animate={isNavOpen ? "open" : "closed"}
          className="desktop"
          style={
            isTablet || scrollY > 0
              ? { background: "white" }
              : { background: "transparent" }
          }
        >
          <div className="logo-group">
            {isTablet && <Hamburger toggle={() => setIsNavOpen(!isNavOpen)} />}
            <div className="brand-logo">
              <Link>
                <h1
                  style={
                    !isTablet && scrollY > 0
                      ? { color: "black" }
                      : isTablet
                      ? { color: "black" }
                      : { color: "white" }
                  }
                >
                  BuildMaster
                </h1>
              </Link>
            </div>
          </div>

          <div className="menu">
            {!isTablet && (
              <ul className="menu-list">
                {navLinks.map((link) => (
                  <motion.li key={link.title}>
                    <Link
                      to={link.url}
                      style={
                        scrollY > 0 ? { color: "black" } : { color: "white" }
                      }
                    >
                      {link.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}

            {auth ? (
              <></>
            ) : (
              <button
                className="nav-btn"
                style={
                  isTablet || scrollY > 0
                    ? { background: "#4f709c", color: "white" }
                    : { background: "white", color: "#4f709c" }
                }
                onClick={() => navigate("/auth")}
              >
                Join
              </button>
            )}
          </div>
        </motion.nav>

        <AnimatePresence>
          {isNavOpen && <Backdrop onClick={() => setIsNavOpen(!isNavOpen)} />}
        </AnimatePresence>

        {isTablet && (
          <motion.nav
            initial={false}
            animate={isNavOpen ? "open" : "closed"}
            variants={sidebarVariants}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 1, right: 0 }}
            dragMomentum={false}
            dragTransition={{ delay: -0.5 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              const isLeftDirection = offset.x < -45 && velocity.x <= 0;
              if (swipe < -swipeConfidenceThreshold || isLeftDirection) {
                setIsNavOpen(!isNavOpen);
              }
            }}
            className="mobile"
          >
            <motion.ul variants={menuVariants} className="mobile-menu-list">
              {navLinks.map((link) => (
                <motion.li
                  variants={linkVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  key={link.title}
                >
                  <Link to={link.url}>{link.title}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </header>

      <Outlet />
    </>
  );
};

export default Navbar;
