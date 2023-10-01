import { Link } from "react-router-dom";
import { navLinks } from "../../utils/constants";
import "./index.css";

const Footer = () => {
  return (
    <section className="footer">
      <div className="f-logo">
        <Link to="/">
          <h1>BuildMaster</h1>
        </Link>
      </div>

      <div className="f-q-links">
        <h2>Quick Links</h2>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="f-admin">
        <h2>Admin Links</h2>
        <Link to="/admin/login">Are you an admin?</Link>
      </div>
    </section>
  );
};

export default Footer;
