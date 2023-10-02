import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Services from "../../pages/Services";
import Contact from "../../pages/Contact";
import Navbar from "../Navbar";
import Auth from "../Auth";
import Profile from "../../pages/Profile";
import Projects from "../../pages/Projects";
import Project from "../Project";
import AdminLogin from "../AdminLogin";
import CreateAmin from "../CreateAdmin";
import AdminMenu from "../AdminMenu";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="service" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="auth" element={<Auth />} />
            <Route path="profile" element={<Profile />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project/:id" element={<Project />} />
          </Route>
          <Route path="/admin" element={<AdminMenu />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminLogin />} />
            <Route path="create" element={<CreateAmin />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
