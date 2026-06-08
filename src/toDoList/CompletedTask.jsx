import "./styling/ListDetail.css";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../components/Button";
import TaskDescription from "../components/TaskDescription";
import EditTask from "../components/EditTask";
import { FaRegEdit } from "react-icons/fa";
const CompletedTask = ({
  CompletedTask,
  completedHandler,
  deleteHandler,
  updateTaskHandler,
}) => {
  const [editingTask, setEditingTask] = useState(null);

  if (CompletedTask.length === 0) {
    return <p>No completed tasks yet.</p>;
  }

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  return (
    <div>
      <h2>Completed</h2>
      {CompletedTask.map((task) => (
        <div key={task.id} className='task'>
          <h3>{task.title}</h3>
          <TaskDescription text={task.description} />

          <div className='task-buttons'>
            <Button onClick={() => completedHandler(task)}>
              Mark as Not Completed
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
};
export default CompletedTask;
