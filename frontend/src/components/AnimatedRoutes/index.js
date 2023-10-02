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
import Dashboard from "../Dashboard";
import UserList from "../Dashboard/UserList";
import ProjectList from "../Dashboard/ProjectList";
import TaskList from "../Dashboard/TaskList";
import ProtectedRoute from "../Routes/ProtectedRoute";
import AdminRoute from "../Routes/AdminRoute";
import NotRequireAuth from "../Routes/NotRequireAuth";
import NotRequireAdmin from "../Routes/NotRequireAdmin";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="service" element={<Services />} />
            <Route path="contact" element={<Contact />} />

            {/* not valid after login */}
            <Route element={<NotRequireAuth />}>
              <Route path="auth" element={<Auth />} />
            </Route>

            {/* user-only routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="projects" element={<Projects />} />
              <Route path="project/:id" element={<Project />} />
            </Route>
          </Route>

          <Route path="/admin" element={<AdminMenu />}>
            {/* not valid after admin login */}
            <Route element={<NotRequireAdmin />}>
              <Route path="login" element={<AdminLogin />} />
            </Route>

            {/* admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<CreateAmin />} />
              <Route path="dashboard/list/users" element={<UserList />} />
              <Route path="dashboard/list/projects" element={<ProjectList />} />
              <Route path="dashboard/list/tasks" element={<TaskList />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
