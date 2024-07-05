// All the params for reactQuery

import { fetchFilterProfile, fetchProfileById, fetchProfiles } from "./fetcher";
import profilesKeys from "./queryKeyFactory";

if (!import.meta.env.VITE_REACT_ROUTER_STALE_TIME) {
  throw new Error("No environment variable: REACT_ROUTER_STALE_TIME");
}

export const profilesParams = () => ({
  queryKey: profilesKeys.all,
  queryFn: () => fetchProfiles(),
  staleTime: +import.meta.env.VITE_REACT_ROUTER_STALE_TIME,
});

export const searchProfilesParams = (q: string) => ({
  queryKey: profilesKeys.search(q),
  queryFn: () => fetchFilterProfile(q),
  staleTime: +import.meta.env.VITE_REACT_ROUTER_STALE_TIME,
});

export const profileParams = (id) => ({
  queryKey: profilesKeys.id(id),
  queryFn: () => fetchProfileById(id),
  staleTime: +import.meta.env.VITE_REACT_ROUTER_STALE_TIME,
});
