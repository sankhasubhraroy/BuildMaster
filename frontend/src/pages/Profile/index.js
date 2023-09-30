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

const Profile = () => {
  const { auth, logout } = useAuth();
  const [user, setUser] = useState(null);

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
      })
      .catch((error) => {
        console.log(error.response.data);
        logout();
      });
  }, [auth, logout]);

  return (
    <div>
      <ProfileSection
        name={user?.name}
        email={user?.email}
        phone={user?.phone}
      />
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
    </div>
  );
};

export default Profile;
