// api.ts - EVERY CALL TO THE BACKEND LIVES HERE

import axios from "axios";
import type { Task, TaskInput } from "./types";

// Pages never write URLs themselves. They call these functions.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// POST /api/tasks -> create a task
export const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data.task;
};

// GET /api/tasks/allTasks -> get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/allTasks");
  return response.data.tasks;
};

// GET /api/tasks/:id -> get a single task
export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.task;
};

//PATCH /api/tasks/:id -> update a single task
export const updateTask = async (
  id: string,
  task: TaskInput,
): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, task);
  return response.data.task;
};

//DELETE /api/tasks/:id -> delete a single task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// // Turns any error into a message we can show users.
// // Our server always sends errors as {message: "..."}.
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || "Cannot reach the server. Is it running?"
    );
  }
  return "Something went wrong";
};
