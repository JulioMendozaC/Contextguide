import React, {useEffect} from "react";
import {useTasks} from "../context/TasksContext";
import TaskCard from '../components/TaskCard'

function TaskPage() {
  const {getTask, tasks} = useTasks();

  useEffect(() => {
    getTask();
  }, []);
  if (tasks.length == 0)
    return (
      <div>
        <h1>No tasks</h1>
      </div>
    );
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {tasks.map((task) => (
       <TaskCard task={task} key={task._id}/>
       ))}
    </div>
  );
}

export default TaskPage;
