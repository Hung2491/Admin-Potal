import type { UserProfile } from "../types/auth";
import { api } from "./Axios";

export const fetchProfileApi = async () => {
  return await api.get<UserProfile>("/iam-v2/auth/profile");
};

