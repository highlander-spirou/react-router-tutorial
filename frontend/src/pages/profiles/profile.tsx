import { Suspense, useEffect, useState } from "react";
import {
  Await,
  Link,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";

type ProfileInterface = {
  avatar: string;
  first_name: string;
  id: number;
  last_name: string;
  note: string;
};

const fetchData = async (id) => {
  const fetcher = await fetch(`http://localhost:3000/profiles/${id}`);
  if (fetcher.ok) {
    return await fetcher.json();
  } else {
    throw new Error();
  }
};

export async function loader({ params }) {
  const data = fetchData(params.profileId);
  return defer({ data: data });
}

const MainUI = () => {
  const profile = useAsyncValue() as ProfileInterface;
  return (
    <>
      <div className="flex gap-1">
        <div className="avatar">
          <div className="mask mask-squircle w-24 bg-gray-200">
            <img className="profile-avatar" src={profile.avatar} />
          </div>
        </div>
        <div>
          <p>
            {profile.first_name} {profile.last_name}
          </p>
          <p>{profile.note}</p>
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  const { profileId } = useParams();

  const data = useLoaderData() as { data: ProfileInterface };

  return (
    <>
      <div className="mt-5 ml-5">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/" className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 50"
                  className="w-4 h-4 stroke-current"
                >
                  <path d="M 24.960938 2.1015625 A 1.0001 1.0001 0 0 0 24.386719 2.3105469 L 1.3867188 20.210938 A 1.0001 1.0001 0 1 0 2.6132812 21.789062 L 4 20.708984 L 4 48 A 1.0001 1.0001 0 0 0 5 49 L 18.832031 49 A 1.0001 1.0001 0 0 0 19.158203 49 L 30.832031 49 A 1.0001 1.0001 0 0 0 31.158203 49 L 45 49 A 1.0001 1.0001 0 0 0 46 48 L 46 20.708984 L 47.386719 21.789062 A 1.0001 1.0001 0 1 0 48.613281 20.210938 L 25.613281 2.3105469 A 1.0001 1.0001 0 0 0 24.960938 2.1015625 z M 25 4.3671875 L 44 19.154297 L 44 47 L 32 47 L 32 29 A 1.0001 1.0001 0 0 0 31 28 L 19 28 A 1.0001 1.0001 0 0 0 18 29 L 18 47 L 6 47 L 6 19.154297 L 25 4.3671875 z M 20 30 L 30 30 L 30 47 L 20 47 L 20 30 z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link to="/profiles" className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                Profiles
              </Link>
            </li>
            <li>
              <span className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 26 26"
                  className="h-4 w-4 stroke-1"
                >
                  <path d="M 7 0 C 4.796875 0 3 1.796875 3 4 L 3 22 C 3 24.203125 4.796875 26 7 26 L 19 26 C 21.203125 26 23 24.203125 23 22 L 23 8 C 23 6.9375 22.027344 5.929688 20.28125 4.21875 C 20.039063 3.980469 19.777344 3.714844 19.53125 3.46875 C 19.285156 3.222656 19.019531 2.992188 18.78125 2.75 C 17.070313 1.003906 16.0625 0 15 0 Z M 7 2 L 14.28125 2 C 15.003906 2.183594 15 3.050781 15 3.9375 L 15 7 C 15 7.550781 15.449219 8 16 8 L 19 8 C 19.996094 8 21 8.003906 21 9 L 21 22 C 21 23.105469 20.105469 24 19 24 L 7 24 C 5.894531 24 5 23.105469 5 22 L 5 4 C 5 2.894531 5.894531 2 7 2 Z M 7.8125 10 C 7.261719 10.050781 6.855469 10.542969 6.90625 11.09375 C 6.957031 11.644531 7.449219 12.050781 8 12 L 18 12 C 18.359375 12.003906 18.695313 11.816406 18.878906 11.503906 C 19.058594 11.191406 19.058594 10.808594 18.878906 10.496094 C 18.695313 10.183594 18.359375 9.996094 18 10 L 8 10 C 7.96875 10 7.9375 10 7.90625 10 C 7.875 10 7.84375 10 7.8125 10 Z M 7.8125 14 C 7.261719 14.050781 6.855469 14.542969 6.90625 15.09375 C 6.957031 15.644531 7.449219 16.050781 8 16 L 16 16 C 16.359375 16.003906 16.695313 15.816406 16.878906 15.503906 C 17.058594 15.191406 17.058594 14.808594 16.878906 14.496094 C 16.695313 14.183594 16.359375 13.996094 16 14 L 8 14 C 7.96875 14 7.9375 14 7.90625 14 C 7.875 14 7.84375 14 7.8125 14 Z M 7.8125 18 C 7.261719 18.050781 6.855469 18.542969 6.90625 19.09375 C 6.957031 19.644531 7.449219 20.050781 8 20 L 18 20 C 18.359375 20.003906 18.695313 19.816406 18.878906 19.503906 C 19.058594 19.191406 19.058594 18.808594 18.878906 18.496094 C 18.695313 18.183594 18.359375 17.996094 18 18 L 8 18 C 7.96875 18 7.9375 18 7.90625 18 C 7.875 18 7.84375 18 7.8125 18 Z"></path>
                </svg>
                Profile {profileId}
              </span>
            </li>
          </ul>
        </div>

        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data.data} errorElement={<p>Error</p>}>
            <MainUI />
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default Profile;
