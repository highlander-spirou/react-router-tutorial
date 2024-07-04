import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  Await,
  defer,
  Form,
  Link,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { Suspense } from "react";
import Breadscrums from "../../components/breadcrums";
import { profileQuery } from "./profile.query";
import type { ProfileInterface } from "../../types";
import { FetchedIcon, IsFetchingIcon } from "../../components/fetching-status";
import ErrorPage from "../error-page";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }): Promise<any> => {
    const id = params.profileId;
    return defer({ data: queryClient.ensureQueryData(profileQuery(id)) });
  };

const AsyncView = () => {
  const { profileId } = useParams();
  const { data: profile, isFetching } = useQuery<ProfileInterface>(
    profileQuery(profileId)
  );
  return (
    <>
      <div>
        {isFetching ? <IsFetchingIcon /> : <FetchedIcon />}
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
          <Link to="edit" className="btn">
            Edit
          </Link>
          <Form action="destroy" method="DELETE">
            <button type="submit" className="btn btn-error">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  const { profileId } = useParams();
  const { data } = useLoaderData() as any;

  return (
    <>
      <div>
        <Breadscrums profileId={profileId} />
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data} errorElement={<ErrorPage />}>
            <AsyncView />
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default Profile;
