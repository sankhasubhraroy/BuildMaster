import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader heading="About Us" />
      <div style={{ width: "600px", margin: "2rem auto" }}>
        <p>
          BuildMaster is a leading project management platform for the
          construction industry. Our mission is to simplify construction project
          management and enhance collaboration among teams.
        </p>
        <br />
        <p>
          Our team consists of experienced professionals in the construction and
          technology sectors. We are passionate about delivering innovative
          solutions to streamline the construction process.
        </p>
        <br />
        <p>
          Contact us today to learn more about how Construction Manager can help
          you manage your construction projects efficiently.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
