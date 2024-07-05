import queryClient from "@/query-client";
import Profiles, { loader as profilesLoader } from ".";
import ProfilesLayout from "./layout";
import NewProfile, { action as newProfileAction } from "./new";
import Profile, { loader as profileLoader } from "./profile";
import Edit, { action as editAction } from "./edit";
import { action as destroyProfileAction } from "./destroy";

const router = {
  path: "/profiles",
  element: <ProfilesLayout />,
  children: [
    {
      index: true,
      element: <Profiles />,
      loader: profilesLoader(queryClient),
    },
    {
      path: "new",
      element: <NewProfile />,
      action: newProfileAction(queryClient),
    },
    {
      path: ":profileId",
      element: <Profile />,
      loader: profileLoader(queryClient),
    },
    {
      path: ":profileId/edit",
      element: <Edit />,
      loader: profileLoader(queryClient),
      action: editAction(queryClient),
    },
    {
      path: ":profileId/destroy",
      action: destroyProfileAction(queryClient),
    },
  ],
};
export default router;
