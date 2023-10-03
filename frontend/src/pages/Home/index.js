import { motion } from "framer-motion";
import Hero from "../../components/Hero";
import PageHeader from "../../components/PageHeader";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader heading="Home" />
      <Hero />
    </motion.div>
  );
};

export default Home;
