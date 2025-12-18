import { api } from "./Axios";

export const fetchDocumentApi = async () => {
  const res =  await api.get("/cbm/documents");
  return res.data.data;
};
