export interface SignInPayload {
  username: string;
  password: string;
}
export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthErrors = {
  username?: string;
  password?: string;
  api?: string;
};

export interface UserProfile {
  username: string;
}

