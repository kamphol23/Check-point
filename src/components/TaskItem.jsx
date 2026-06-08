import { useState } from "react";
import Button from "../components/Button";
import TaskDescription from "./TaskDescription";
import EditTask from "./EditTask";

function TaskItem({
  task,
  completedHandler,
  deleteHandler,
  updateTaskHandler,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const handleSave = () => {
    updateTaskHandler(task.id, editedTask.title, editedTask.description);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({
      title: task.title,
      description: task.description,
    });
    setIsEditing(false);
  };

  return (
    <div className='task'>
      <div className='view-mode'>
        <h3>{task.title}</h3>
        <TaskDescription text={task.description} />

        <div className='task-buttons'>
          <Button onClick={() => completedHandler(task)} style='save'>
            Mark as Completed
          </Button>

          <Button onClick={() => deleteHandler(task.id)} style='delete'>
            Delete
          </Button>

          <EditTask task={task} onSave={updateTaskHandler} />
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
