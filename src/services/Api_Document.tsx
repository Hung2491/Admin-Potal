import { api } from "./Axios";

export const fetchDocumentApi = async () => {
  const res = await api.get("/cbm/documents");
  return res.data.data;
};

export const  detailDocumentApi = async (id: string) => {
  const res = await api.get(`/cbm/documents/${id}`);
  return res.data;
};

export const  updateDocumentApi = async () => {
  const res = await api.post(`/cbm/documents`);
  return res.data;
};
