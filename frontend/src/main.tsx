import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./layouts/admin.tsx";
import Root from "./layouts/root.tsx";
import Index from "./pages/index.tsx";
import Profile, { loader as ProfileLoader } from "./pages/profiles/profile.tsx";
import Profiles from "./layouts/profile-layout.tsx";
import ProfilesContent, {
  action as ProfilesAction,
} from "./pages/profiles/profiles.tsx";
import Stats from "./pages/admin/stats.tsx";
import ErrorPage from "./pages/error-page.tsx";

const router = createBrowserRouter([
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
          { index: true, element: <ProfilesContent />, action: ProfilesAction },
          { path: ":profileId", element: <Profile />, loader: ProfileLoader },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [{ index: true, element: <Stats /> }],
  },
  { path: "*", element: <ErrorPage /> },
]);
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import createRouter from "./router.tsx";
import queryClient from "./query-client.ts";

const router = createRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
