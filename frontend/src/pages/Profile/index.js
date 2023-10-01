import ProfileCards from "../../components/ProfileCards";
import Card from "../../components/ProfileCards/Card";
import { IoConstructOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import ProfileSection from "../../components/ProfileSection";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PageHeader from "../../components/PageHeader";
import "./index.css";

const Profile = () => {
  const { auth, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        logout();
      });
  }, [auth, logout]);

  return (
    !isLoading && (
      <>
        <PageHeader heading="profile" />

        <div className="pr-container">
          <ProfileCards>
            <Card
              icon={<IoConstructOutline />}
              text={"Projects"}
              accent={"#4f709c"}
              route={"/projects"}
            />
            <Card
              icon={<TbEdit />}
              text={"Edit Profile"}
              accent={"#186F65"}
              route={"/profile/edit"}
            />
            <Card
              icon={<RiLockPasswordLine />}
              text={"Change Password"}
              accent={"#213555"}
              route={"/profile/edit/password"}
            />
            <Card
              icon={<MdLogout />}
              text={"Logout"}
              accent={"#A73121"}
              route={"/logout"}
            />
          </ProfileCards>

          <ProfileSection user={user} />
        </div>
      </>
    )
  );
};

export default Profile;
