import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { deleteProfile } from "./query/fetcher";
import profilesKeys from "./query/queryKeyFactory";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }) => {
    if (request.method !== "DELETE") {
      throw new Response("", { status: 405 });
    }
    await deleteProfile(params.profileId);
    queryClient.invalidateQueries({
      queryKey: profilesKeys.all,
    });
    return redirect("/profiles");
  };
