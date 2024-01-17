import {createContext, useContext, useState} from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteRequest,
  getTaskRequestRequest,
  updateRequest
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTask must be used");

  return context;
};

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);

  const createTask = async (tasks) => {
    const res = await createTaskRequest(tasks);
    console.log(res);
  };
  const getTask = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const delteTask = async (id) => {
    try {
      const res = await deleteRequest(id);
      if (res.status == 204) setTasks(tasks.filter((task) => task._id != id));
    } catch (error) {
      console.error(error);
    }
  };
  const getTasks = async (id) => {
    try {
      const res = await getTaskRequestRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateTasks = async (id, date, task) => {
   try {
     await updateRequest(id, date, task);
   } catch (error) {
     console.error(error);
   }
 };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTask,
        delteTask,
        getTasks,
        updateTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
