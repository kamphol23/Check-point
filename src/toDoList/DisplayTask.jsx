import EditTask from "../components/EditTask";
import TaskItem from "../components/TaskItem";
import Button from "../components/Button";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import TaskDescription from "../components/TaskDescription";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
function DisplayTask({
  notCompleted,
  completedHandler,
  deleteHandler,
  updateTaskHandler,
}) {
  {
    const [displayState, setDisplayState] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    if (notCompleted === undefined || notCompleted.length === 0) {
      return <p>No tasks to display.</p>;
    }
    const handleEditClick = (task) => {
      setEditingTask(task);
    };

    return (
      <div>
        {notCompleted.map((task) => (
          <div key={task.id} className='task'>
            <h3>{task.title}</h3>
            <TaskDescription text={task.description} />
            <p>{task.points}</p>

            <div className='task-buttons'>
              <Button onClick={() => completedHandler(task)} style='icon'>
                <MdCheckBoxOutlineBlank />
              </Button>
              <Button onClick={() => deleteHandler(task.id)} style='icon'>
                <GoTrash />
              </Button>
              <Button onClick={() => handleEditClick(task)} style='icon'>
                <FaRegEdit />
              </Button>
            </div>
          </div>
        ))}
        {editingTask && (
          <EditTask
            task={editingTask}
            onSave={updateTaskHandler}
            onClose={() => setEditingTask(null)}
          />
        )}
      </div>
    );
  }
}
export default DisplayTask;
