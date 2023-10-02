import Card from "./Card";
import CardContainer from "./CardContainer";
import { HiUsers } from "react-icons/hi2";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAdmin } from "../../contexts/adminContext";
import ProfileSection from "../ProfileSection";
import "./index.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { admin, logout } = useAdmin();

  useEffect(() => {
    axios
      .get("/admin/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: admin,
        },
      })
      .then((response) => {
        setDashboardData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        logout();
      });
  }, [admin, logout]);

  return (
    !isLoading && (
      <div className="dashboard">
        <CardContainer>
          <Card
            heading="users"
            count={dashboardData.users.length}
            logo={<HiUsers size={60} />}
          />
          <Card
            heading="projects"
            count={dashboardData.projects.length}
            logo={<MdOutlineHolidayVillage size={60} />}
          />
          <Card
            heading="tasks"
            count={dashboardData.tasks.length}
            logo={<BiTask size={60} />}
          />
        </CardContainer>

        <ProfileSection user={dashboardData.admin} />
      </div>
    )
  );
};

export default Dashboard;
