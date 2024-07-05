import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  Await,
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { Suspense } from "react";
import { NewProfileType, ProfileInterface } from "./types";
import ErrorPage from "../error-page";
import { formSerialize } from "@/lib/form-serialize";
import profilesKeys from "./query/queryKeyFactory";
import { updateProfile } from "./query/fetcher";
import { profileParams } from "./query/params";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }) => {
    if (request.method !== "PUT") {
      throw new Response("", { status: 405 });
    }
    const updates = (await formSerialize(request)) as NewProfileType;
    await updateProfile(params.profileId, updates);
    queryClient.invalidateQueries({
      queryKey: profilesKeys.id(params.profileId),
    });
    return redirect(`/profiles/${params.profileId}`);
  };

const AsyncView = () => {
  const { profileId } = useParams();
  const { data } = useQuery<ProfileInterface>(profileParams(profileId));
  const navigation = useNavigation();

  return (
    <>
      <Form method="PUT" className="mt-5 ml-5 w-80 flex flex-col gap-3">
        <label className="input input-bordered flex items-center gap-2">
          First Name
          <input
            type="text"
            className="grow"
            placeholder="Daisy"
            name="first_name"
            defaultValue={data.first_name}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Last Name
          <input
            type="text"
            className="grow"
            placeholder="UI"
            name="last_name"
            defaultValue={data.last_name}
            required
          />
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Bio"
          defaultValue={data.note}
          name="note"
        ></textarea>
        <button
          type="submit"
          className="btn"
          disabled={navigation.state !== "idle"}
        >
          {navigation.state === "idle" ? (
            "Submit"
          ) : (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </button>
      </Form>
    </>
  );
};

const Edit = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData() as { data: any };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="link inline-flex gap-1 items-end"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-4 h-4"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
          />
        </svg>
        Back
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data} errorElement={<ErrorPage />}>
          <AsyncView />
        </Await>
      </Suspense>
    </>
  );
};

export default Edit;
