import { BsFillGridFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";

const AdminMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="admin-menu">
        <button title="create-admin" onClick={() => navigate("/admin/create")}>
          <BsFillPersonPlusFill />
        </button>

        <button title="dashboard" onClick={() => navigate("/admin/dashboard")}>
          <BsFillGridFill />
        </button>

        <button title="logout" onClick={() => navigate("/admin/logout")}>
          <FaPowerOff />
        </button>
      </nav>

      <Outlet />
    </>
  );
};

export default AdminMenu;
