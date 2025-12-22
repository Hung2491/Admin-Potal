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

export type DocumentStatus = "draft" | "published" | "archived"; // Có thể mở rộng thêm các status khác
export type DocumentScope = "private" | "public" | "shared";
export type DocumentType = "markdown" | "html" | "text";
export interface IDocument {
  _id: string;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  summary: string;
  type: DocumentType | string;
  labels: string[];
  status: DocumentStatus | string;
  scope: DocumentScope | string;
  createdAt: string; // Định dạng ISO Date string
  updatedAt: string;
  deletedAt: string;
  __v: number;
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
