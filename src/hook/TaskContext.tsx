import { createContext, useContext, useState } from "react";
import type { AddTask, ListTask, UpdateTask } from "../types/TaskManagement";
import {
  addTaskApi,
  deleteTaskApi,
  detailTaskApi,
  getListTaskApi,
  updateTaskApi,
} from "../services/Api_Task";
import { fetchAgentsApi, fetchUsersApi } from "../services/Api_User";
import type { Users } from "../types/Other";
import { Alert, Snackbar } from "@mui/material";

type TaskContextType = {
  tasks: ListTask[];
  users: Users[];
  taskDetail: ListTask | null;
  loading: boolean;
  fetchTask: (search?: string) => Promise<void>;
  addTask: (data: AddTask) => Promise<boolean>;
  updateTask: (id: string, data: UpdateTask) => Promise<boolean>;
  fetchUsers: () => Promise<void>;
  fetchAgents: () => Promise<void>;
  detailTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<boolean>;
  alert: (message: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<ListTask[]>([]);
  const [taskDetail, setTaskDetail] = useState<ListTask | null>(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchTask = async (search?: string) => {
    setLoading(true);
    try {
      const data = await getListTaskApi({ search });
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };
  const addTask = async (data: AddTask) => {
    const res = await addTaskApi(data);
    if (res.status === 201) {
      fetchTask();
      return true;
    }
    return false;
  };
  const fetchUsers = async () => {
    const data = await fetchUsersApi();
    setUsers(data);
  };

  const fetchAgents = async () => {
    const res = await fetchAgentsApi();
    return res;
  };
  const detailTask = async (id: string) => {
    const data = await detailTaskApi(id);
    setTaskDetail(data);
  };
  const updateTask = async (id: string, data: UpdateTask) => {
    const res = await updateTaskApi(id, data);
    if (res.status === 200) {
      fetchTask();
      return true;
    }
    return false;
  };

  const deleteTask = async (id: string) => {
    console.log(id);
    const res = await deleteTaskApi(id);
    console.log(res)
    try {
      if (res.status === 200) {
        fetchTask();
        return true;
      } else if (res.status === 400) {
        setOpen(true);
        return false;
      }
    } catch (error) {
      console.error("Fetch tasks failed:", error);
    }
    return false
  };

  const alert = (message: string) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <TaskContext.Provider
      value={{
        alert,
        deleteTask,
        loading,
        detailTask,
        taskDetail,
        users,
        tasks,
        fetchTask,
        addTask,
        fetchUsers,
        fetchAgents,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const UseTask = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask phải nằm trong TaskProvider");
  return ctx;
};
