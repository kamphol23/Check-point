import "./styling/DisplayTask.css";
import Button from "../components/Button";
import TaskDescription from "../components/TaskDescription";

import { useState } from "react";

function DisplayTask({
  notCompleted,
  completedHandler,
  deleteHandler,
  updateTaskHandler,
}) {
  {
    const [displayState, setDisplayState] = useState(null);
    const [editedTask, setEditedTask] = useState({
      title: "",
      description: "",
    });

    if (notCompleted === undefined || notCompleted.length === 0) {
      return <p>No tasks to display.</p>;
    }

    const handleEditClick = (task) => {
      setDisplayState(task.id);
      setEditedTask({ title: task.title, description: task.description });
    };

    return (
      <div>
        {notCompleted.map((task) => (
          <div key={task.id} className='task'>
            {displayState === task.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateTaskHandler(
                    task.id,
                    editedTask.title,
                    editedTask.description,
                  );
                  setDisplayState(null);
                }}>
                <input
                  type='text'
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  placeholder='Edit title'
                />
                <input
                  type='text'
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  placeholder='Edit description'
                />
                <Button style='callToActionSave' text={"Save"} type='submit' />
              </form>
            ) : (
              <>
                <h3>{task.title}</h3>
                <TaskDescription text={task.description} />
                <div className='task-buttons'>
                  <Button onClick={() => completedHandler(task)} style='save'>
                    Mark as Completed
                  </Button>
                  <Button onClick={() => deleteHandler(task.id)} style='delete'>
                    Delete
                  </Button>
                  <Button onClick={() => handleEditClick(task)} style='edit'>
                    Edit
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
}
export default DisplayTask;
