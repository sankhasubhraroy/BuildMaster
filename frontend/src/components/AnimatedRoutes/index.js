import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Services from "../../pages/Services";
import Contact from "../../pages/Contact";
import Navbar from "../Navbar";
import Auth from "../Auth";
import Profile from "../../pages/Profile";
import { AuthProvider } from "../../contexts/authContext";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <AuthProvider>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="service" element={<Services />} />
              <Route path="contact" element={<Contact />} />
              <Route path="auth" element={<Auth />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
