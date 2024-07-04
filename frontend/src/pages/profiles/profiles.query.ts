import axios from "../../lib/axios";

const profileFetcher = async () => {
  const data = await axios.get(`/profiles`);
  return data.data;
};

const profilesQuery = () => ({
  queryKey: ["profiles"],
  queryFn: () => profileFetcher(),
  staleTime: 10000,
});

const searchProfilesFetcher = async (q: string) => {
  const data = await axios.post(`/profiles/search`, {
    q,
  });
  return data.data;
};

const searchProfilesQuery = (q) => ({
  queryKey: ["profiles", "search", q],
  queryFn: () => searchProfilesFetcher(q),
  staleTime: 10000,
});

export { profilesQuery, searchProfilesQuery };
