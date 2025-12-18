import type { SignInPayload, SignInResponse } from "../types/auth";
import { api } from "./Axios";

export const signInApi = (data: SignInPayload) => {
  return api.post<SignInResponse>(`/iam-v2/auth/login`, data);
};
