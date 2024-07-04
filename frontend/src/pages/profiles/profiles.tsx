import {
  Await,
  Form,
  Link,
  defer,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import debounce from "lodash.debounce";
import { Suspense } from "react";
import { ProfileInterface } from "../../types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { searchProfilesQuery } from "./profiles.query";
import ErrorPage from "../error-page";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }): Promise<any> => {
    const url = new URL(request.url);
    const q = url.searchParams.get("search");
    return defer({ data: queryClient.ensureQueryData(searchProfilesQuery(q)) });
  };

const ProfilesSection = ({ q }) => {
  const { data: profiles } = useQuery<ProfileInterface[]>(
    searchProfilesQuery(q)
  );
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {profiles.map((x) => (
          <Link
            key={x.id}
            to={`${x.id}`}
            className="link"
          >{`${x.first_name} ${x.last_name}`}</Link>
        ))}
      </div>
    </>
  );
};

const ProfilesContent = () => {
  const [searchParams, _] = useSearchParams();
  const submit = useSubmit();
  const { data } = useLoaderData() as { data: any };
  const navigation = useNavigation();

  const searchProfileHandler = (e) => {
    const prevSearch = searchParams.get("search");
    submit(e, {
      replace: prevSearch !== null,
    });
  };

  const debounceSearchProfile = debounce(searchProfileHandler, 700);

  return (
    <>
      <Link to="new" className="btn">
        New Profile
      </Link>
      <Form role="search" className="mt-5 ml-5 flex gap-3 items-center">
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
        <span
          className={`loading loading-dots loading-lg ${
            navigation.state === "idle" && "hidden"
          }`}
        ></span>
      </Form>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data} errorElement={<ErrorPage />}>
          <ProfilesSection q={searchParams.get("search")} />
        </Await>
      </Suspense>
    </>
  );
};

export default ProfilesContent;
