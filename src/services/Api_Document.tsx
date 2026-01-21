import type { AddDocument } from "../types/DocumentType";
import { api } from "./Axios";

export const fetchDocumentApi = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, page = 1, limit = 50 } = params || {};

  const isSearch = Boolean(search?.trim());

  const res = await api.get("/cbm/documents", {
    params: isSearch
      ? { search } // 🔍 search → chỉ gửi search
      : { page, limit }, // 📄 get list → page + limit
  });

  return res.data.data;
};

export const detailDocumentApi = async (id: string) => {
  const res = await api.get(`/cbm/documents/${id}`);
  return res.data;
};

export const contentDocumentApi = async (id: string) => {
  const res = await api.get(`/cbm/documents/${id}/content`);
  return res.data;
};

export const addDocumentApi = (data: AddDocument) => {
  return api.post<AddDocument>(`/cbm/documents`, data);
};

export const deleteDocumentApi = (id: string) => {
  return api.delete(`/cbm/documents/${id}`);
};

export const updateDocumentApi = (id: string, data: AddDocument) => {
  return api.patch<AddDocument>(`/cbm/documents/${id}`, data);
};
