import type { AddTask, UpdateTask } from "../types/TaskManagement";
import { api } from "./Axios";

export const getListTaskApi = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, page = 1, limit = 50 } = params || {};

  const isSearch = Boolean(search?.trim());

  const res = await api.get("/cbm/works", {
    params: isSearch ? { search } : { page, limit },
  });

  return res.data.data;
};
export const addTaskApi = (data: AddTask) => {
  return api.post("/cbm/works", data);
};
export const updateTaskApi = (id: string, data: UpdateTask) => {
  return api.patch(`/cbm/works/${id}`, data);
};

export const detailTaskApi = async (id: string) => {
  const res = await api.get(`/cbm/works/${id}`);
  return res.data;
};

export const deleteTaskApi = async (id: string) => {
  const res = await api.delete(`/cbm/works/${id}`);
  console.log(res);
  return res;
};
