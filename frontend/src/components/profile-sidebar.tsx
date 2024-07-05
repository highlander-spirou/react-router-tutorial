import { useQuery } from "@tanstack/react-query";
import { NavLink as RRNavLink } from "react-router-dom";
import { FetchedIcon, IsFetchingIcon } from "./fetching-status";
import { profilesParams } from "@/pages/profiles/query/params";
import { ProfileInterface } from "@/pages/profiles/types";

const NavLink = ({ label, link }) => {
  return <RRNavLink to={`${link}`}>Profile {label}</RRNavLink>;
};

const NavLinkLoading = () => {
  return <div className="skeleton h-8 w-full"></div>;
};

const ProfileSidebar = ({ children }) => {
  const {
    data: links,
    isLoading,
    isFetching,
  } = useQuery<ProfileInterface[]>(profilesParams());

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-screen w-60 p-4">
            <p className="w-full inline-flex justify-end">
              {isFetching ? <IsFetchingIcon /> : <FetchedIcon />}
            </p>
            {isLoading ? (
              <NavLinkLoading />
            ) : (
              <>
                {links.map((x, index) => (
                  <li key={index} className="mt-1">
                    <NavLink label={x.first_name} link={x.id} />
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
