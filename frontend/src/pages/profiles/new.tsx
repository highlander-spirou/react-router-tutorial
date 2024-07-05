import { QueryClient } from "@tanstack/react-query";
import { Form, redirect, useNavigation } from "react-router-dom";
import Breadscrums from "../../components/breadcrums";
import { formSerialize } from "@/lib/form-serialize";
import { createProfile } from "./query/fetcher";
import { NewProfileType } from "./types";
import profilesKeys from "./query/queryKeyFactory";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }) => {
    if (request.method !== "POST") {
      throw new Response("", { status: 405 });
    }
    const newProfile = (await formSerialize(request)) as NewProfileType;
    const data = await createProfile(newProfile);
    queryClient.invalidateQueries({
      queryKey: profilesKeys.all,
    });
    return redirect(`/profiles/${data.id}`);
  };

const NewProfile = () => {
  const navigation = useNavigation();

  return (
    <>
      <Breadscrums type="new" />
      <Form method="POST" className="mt-5 ml-5 w-80 flex flex-col gap-3">
        <label className="input input-bordered flex items-center gap-2">
          First Name
          <input
            type="text"
            className="grow"
            placeholder="Daisy"
            name="first_name"
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
            required
          />
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Bio"
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

export default NewProfile;
