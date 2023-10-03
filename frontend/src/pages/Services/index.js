import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader heading="Services" />
      <div style={{ width: "600px", margin: "2rem auto" }}>
        <p>
          Comprehensive project planning and scheduling to ensure efficient
          construction processes.
        </p>
        <br />
        <p>
          Assign and track tasks for different project roles, including project
          managers, contractors, and supervisors.
        </p>
        <br />
        <p>
          Store and manage construction sheets, blueprints, and project
          documentation securely.
        </p>
      </div>
    </motion.div>
  );
};

export default Services;
