import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import axios from "../../lib/axios";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }) => {
    if (request.method !== "DELETE") {
      throw new Response("", { status: 405 });
    }
    const response = await axios.delete(`/profiles/${params.profileId}`);
    if (response.status !== 204) {
      throw new Response("", { status: 400 });
    }
    queryClient.invalidateQueries({
      queryKey: ["profiles"],
    });
    return redirect("/profiles");
  };
