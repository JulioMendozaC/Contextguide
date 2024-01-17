import axios from "./axios";

export const getTasksRequest = () => axios.get(`/tasks`);

export const getTaskRequestRequest = (id) => axios.get(`/tasks/${id}`);

export const createTaskRequest = (task) => axios.post(`/tasks`, task);

export const updateRequest = (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteRequest = (id) => axios.delete(`/tasks/${id}`);
