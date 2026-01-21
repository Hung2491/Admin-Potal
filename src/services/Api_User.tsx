import type { UserProfile } from "../types/AuthType";
import { api } from "./Axios";

export const fetchProfileApi = async () => {
  return await api.get<UserProfile>("/iam-v2/auth/profile");
};

export const fetchUsersApi = async () => {
  const res = await api.get("/iam-v2/users?limit=1000");
  return res.data.data;
};
export const fetchAgentsApi = async () => {
  const res = await api.get("/aiwm/agents?limit=1000");
  return res.data.data;
};
