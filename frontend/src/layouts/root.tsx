import { Link, Outlet } from "react-router-dom";
import "../index.css";

const Root = () => {
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="profiles">View Profiles</Link>
            </li>
            <li>
              <label
                htmlFor="my-drawer-2"
                className="btn btn-outline btn-square border-0 btn-sm drawer-button lg:hidden"
              >
                <svg
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  className="h-5 w-5"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>70 Basic icons by Xicons.co</title>
                    <path
                      d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z"
                      fill="#6f7380"
                    ></path>
                    <path
                      d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z"
                      fill="#6f7380"
                    ></path>
                    <path
                      d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z"
                      fill="#6f7380"
                    ></path>
                  </g>
                </svg>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
