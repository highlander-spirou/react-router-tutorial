import { QueryClient } from "@tanstack/react-query";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { ProfileInterface } from "../../types";
import axios from "../../lib/axios";
import Breadscrums from "../../components/breadcrums";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }) => {
    if (request.method !== "POST") {
      throw new Response("", { status: 405 });
    }
    const formData = await request.formData();
    const newProfile = Object.fromEntries(formData);
    const response = await axios.post("/profiles", newProfile);
    if (response.status !== 201) {
      throw new Response("", { status: 400 });
    }
    queryClient.invalidateQueries({
      queryKey: ["profiles"],
    });
    const data = response.data as ProfileInterface;
    return redirect(`/profiles/${data.id}`);
  };

const NewProfile = () => {
  const navigation = useNavigation();

  return (
    <>
      <Breadscrums type="new"/>
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
