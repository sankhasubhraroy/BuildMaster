import ProfileCards from "../../components/ProfileCards";
import Card from "../../components/ProfileCards/Card";
import { IoConstructOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import ProfileSection from "../../components/ProfileSection";

const Profile = () => {
  return (
    <div>
      <ProfileSection
        name={"Sankhasubhra Roy"}
        email={"sankha@gmail.com"}
        phone={"+91 6718922125"}
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