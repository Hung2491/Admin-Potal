export const TaskType = {
  USERS: "users",
  AGENTS: "agents",
};

export type TaskType = (typeof TaskType)[keyof typeof TaskType];

export interface Reporter {
  type?: string;
  id?: string;
}

export interface AddTask {
  title?: string;
  description?: string;
  type?: string;
  reporter?: Reporter;
  dueDate?: string;
  startAt?: string;
  documents: string[];
}

export interface UpdateTask {
  title?: string;
  description?: string;
  reporter?: Reporter;
  dueDate?: string;
  startAt?: string;
  documents: string[];
}

export interface ListTask {
  _id?: string;
  description?: string;
  reporter?: Reporter;
  title?: string;
  type?: string;
  createdAt?: string;
  dueDate?: string;
  documents: string[];
  startAt?: string;
  status?: string;
}
