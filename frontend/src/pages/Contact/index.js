import { motion } from "framer-motion";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader heading="Contact Us" />
      <ContactForm />
    </motion.div>
  );
};

export default Contact;
