import axios from "axios";
import { NewProfileType, ProfileInterface } from "../types";

if (!import.meta.env.VITE_SERVER_URL) {
  throw new Error("No environment variable: SERVER_URL");
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/profiles",
  headers: {
    "Content-type": "application/json",
  },
});

export const fetchProfiles = async () => {
  const response = await axiosClient.get("");
  return response.data;
};

export const fetchProfileById = async (id) => {
  const response = await axiosClient.get(`/${id}`);
  return response.data;
};

export const fetchFilterProfile = async (q: string) => {
  const response = await axiosClient.post(`/search`, {
    q,
  });
  return response.data;
};

export const createProfile = async (
  newProfile: NewProfileType
): Promise<ProfileInterface> => {
  const response = await axiosClient.post("", newProfile);
  if (response.status !== 201) {
    throw new Response("Error creating new profile", { status: 400 });
  }
  return response.data;
};

export const updateProfile = async (profileId, updates) => {
  const response = await axiosClient.put(`/${profileId}`, updates);
  if (response.status !== 200) {
    throw new Response("Cannot update this profile", { status: 400 });
  }
  return response.data;
};

export const deleteProfile = async (profileId) => {
  const response = await axiosClient.delete(`/${profileId}`);
  if (response.status !== 204) {
    throw new Response("Cannot delete this profile", { status: 400 });
  }
  return response.data;
};
