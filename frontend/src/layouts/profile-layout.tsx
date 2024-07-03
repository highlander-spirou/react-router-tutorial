import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/profile-sidebar";
import { useEffect, useState } from "react";

const Profiles = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const fetcher = await fetch("http://localhost:3000/profiles");
      if (fetcher.ok) {
        const data = await fetcher.json();
        setLinks(data.map((x) => x.id));
      }
    };

    fetchLinks();
  }, []);

  return (
    <>
      <ProfileSidebar links={links}>
        <Outlet />
      </ProfileSidebar>
    </>
  );
};

export default Profiles;
