import ProfileCards from "../../components/ProfileCards";
import Card from "../../components/ProfileCards/Card";
import { IoConstructOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import ProfileSection from "../../components/ProfileSection";
import { useAuth } from "../../contexts/authContext";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);

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
