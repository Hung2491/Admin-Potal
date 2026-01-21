export const DocumentType = {
  MARKDOWN: "markdown",
  TEXT: "text",
  HTML: "html",
  JSON: "json"
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
export interface AddDocument {
  summary?: string;
  type?: DocumentType;
  labels?: string[];
  content?: string;
}


export interface DocumentsList {
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
