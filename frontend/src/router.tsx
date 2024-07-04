import { createBrowserRouter } from "react-router-dom";
import Root from "./layouts/root";
import ErrorPage from "./pages/error-page";
import Index from "./pages";
import Profiles from "./layouts/profile-layout";
import NewProfile, { action as newProfileAction } from "./pages/profiles/new";
import ProfilesContent, {
  loader as profilesLoader,
} from "./pages/profiles/profiles";
import Profile, { loader as profileLoader } from "./pages/profiles/profile";
import Edit, { action as editAction } from "./pages/profiles/edit";
import { action as destroyProfileAction } from "./pages/profiles/destroy";

const createRouter = (queryClient) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Index /> },
        {
          path: "/profiles",
          element: <Profiles />,
          children: [
            {
              index: true,
              element: <ProfilesContent />,
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
              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
    },
    { path: "*", element: <ErrorPage /> },
  ]);
};

export default createRouter;
