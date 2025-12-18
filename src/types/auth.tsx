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

export interface Documents {
  _id?: string;
  createdBy?: string;
  updatedBy?: string;
  summary?: string;
  type?: string;
  labels?: string[];
  status?: string;
  scope?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
