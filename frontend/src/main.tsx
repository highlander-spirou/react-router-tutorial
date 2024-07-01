import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import About from "./About.tsx";

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/about', element: <About />},
])


ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
