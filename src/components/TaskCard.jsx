import { useTasks } from "../context/TasksContext"
import {Link} from 'react-router-dom'
function TaskCard(task) {
  
  const {delteTask} = useTasks()

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
      <h1 className="text-2xl font-bold">{task.task.title}</h1>
        <div className="flex gap-x-2 items-center">
            <Link className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-md" to={`/tasks/${task.task._id}`}>Edit</Link>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md" onClick={() =>{
              delteTask(task.task._id)
            }}>Delete</button>
        </div>
      </header>
    </div>
  )
}

export default TaskCard