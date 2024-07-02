import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/profile-sidebar";

const Profiles = () => {
  const links = ["A", "B", "C"];

  return (
    <>
      <ProfileSidebar links={links}>
        <Outlet />
      </ProfileSidebar>
    </>
  );
};

export default Profiles;
