import { Outlet, useNavigation } from "react-router-dom";
import ProfileSidebar from "../components/profile-sidebar";

const Profiles = () => {
  return (
    <>
      <ProfileSidebar>
        <div className="mt-5 ml-5">
          <Outlet />
        </div>
      </ProfileSidebar>
    </>
  );
};

export default Profiles;
