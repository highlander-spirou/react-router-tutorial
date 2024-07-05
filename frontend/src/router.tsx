import { createBrowserRouter } from "react-router-dom";
import Root from "./layouts/root";
import ErrorPage from "./pages/error-page";
import Index from "./pages";
import profileRouter from "./pages/profiles/router";

const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <Index /> }, profileRouter],
    },
    { path: "*", element: <ErrorPage /> },
  ]);
};

export default createRouter;
