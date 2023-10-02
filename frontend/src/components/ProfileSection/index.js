import { RiErrorWarningFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";
import "./index.css";

const ProfileSection = ({ user }) => {
  return (
    <motion.section whileHover={{ rotate: 1 }} className="p-section">
      <div className="p-photo-container">
        <img
          src={user.avatar}
          alt="Profile"
          draggable={false}
          className="p-photo"
        />
      </div>

      <div className="p-details">
        <p className="p-name">
          {user.name}
          <span></span>
        </p>

        <p className="p-field p-username">
          {"@ " + user.username}
          <span></span>
        </p>

        {user.email && (
          <p className="p-email">
            {user.email}
            {user.emailVerified ? (
              <span>
                <MdVerified />
              </span>
            ) : (
              <span title="Email not verified">
                <RiErrorWarningFill color="#ff6347" />
              </span>
            )}
          </p>
        )}

        {user.phone && (
          <p className="p-field">
            {"+91 " + user.phone}
            <span></span>
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default ProfileSection;
