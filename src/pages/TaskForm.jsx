import {useForm} from "react-hook-form";
import {useTasks} from "../context/TasksContext";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function TaskForm() {
  const {register, handleSubmit, setValue} = useForm();
  const {createTask, getTasks, updateTasks} = useTasks();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTasks(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", task.date);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTasks(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("title")}
            autoFocus
          />
            <label htmlFor="date">Date</label>
          <input
            type="date"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("date")}
          />
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder="descripcion"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3"
            {...register("description")}
          ></textarea>
        

          <button className=" bg-indigo-500 px-3 py-3 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
