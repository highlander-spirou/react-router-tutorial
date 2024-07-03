import { Form, redirect, useSearchParams, useSubmit } from "react-router-dom";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

export const action = async ({ request, params }) => {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      const updates = Object.fromEntries(formData);
      const fetcher = await fetch("http://localhost:3000/profiles", {
        method: "POST",
        body: JSON.stringify(updates),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (fetcher.ok) {
        const newProfile = await fetcher.json();
        return redirect(`/profiles/${newProfile.id}`);
      } else {
        throw new Response("", { status: 400 });
      }
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
};



const ProfilesContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const [searchResult, setSearchResult] = useState("");

  const searchProfileHandler = (e) => {
    const prevSearch = searchParams.get("search");
    submit(e, {
      replace: prevSearch !== null,
    });
  };

  const debounceSearchProfile = debounce(searchProfileHandler, 700);

  useEffect(() => {
    const fetchSearch = async () => {
      const fetcher = await fetch("http://localhost:3000/profiles/search");
      if (fetcher.ok) {
        const data = await fetcher.json();
        setSearchResult("Search found");
      } else {
        setSearchResult("Search not found");
      }
    };
    fetchSearch();
  });

  return (
    <>
      <Form method="POST" className="mt-5 ml-5 w-80 flex flex-col gap-3">
        <label className="input input-bordered flex items-center gap-2">
          First Name
          <input
            type="text"
            className="grow"
            placeholder="Daisy"
            name="first_name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Last Name
          <input
            type="text"
            className="grow"
            placeholder="UI"
            name="last_name"
          />
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Bio"
          name="note"
        ></textarea>
        <button type="submit" className="btn">
          Submit
        </button>
      </Form>
      <Form role="search" className="mt-5 ml-5">
        <input
          type="text"
          name="search"
          placeholder="Search profile ..."
          className="input input-bordered"
          defaultValue={
            searchParams.get("search") !== null
              ? searchParams.get("search")!
              : ""
          }
          onChange={(e) => debounceSearchProfile(e.currentTarget.form)}
        />
      </Form>
      <div>
        Search result: {searchResult}
      </div>
    </>
  );
};

export default ProfilesContent;
