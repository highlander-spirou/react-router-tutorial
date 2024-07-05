const profilesKeys = {
  all: ["profiles"] as const,
  id: (id) => [...profilesKeys.all, id] as const,
  search: (q:string) => [...profilesKeys.all, "search", q] as const,
};

export default profilesKeys;
