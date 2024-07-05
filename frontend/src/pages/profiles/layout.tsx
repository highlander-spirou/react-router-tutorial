import ProfileSidebar from "@/components/profile-sidebar";
import { Outlet } from "react-router-dom";

const ProfilesLayout = () => {
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

export default ProfilesLayout;
