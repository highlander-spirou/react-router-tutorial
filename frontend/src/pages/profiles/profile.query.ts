import axios from "../../lib/axios";

const fetcher = async (id) => {
  const data = await axios.get(`/profiles/${id}`);
  return data.data;
};

const profileQuery = (id) => ({
  queryKey: ["profiles", id],
  queryFn: () => fetcher(id),
  staleTime: 10000,
});

export { profileQuery };
