import './TodoList.css'
import { useState } from 'react'

function DisplayTask ({notCompleted,completedHandler,deleteHandler,updateHandler}){ {
const  [displayState, setDisplayState] = useState(null);
const [editedTask, setEditedTask] = useState({ title: '', description: '' });

if(notCompleted === undefined || notCompleted.length === 0){
  return <p>No tasks to display.</p>;
}

const handleEditClick = (task) => {
  setDisplayState(task.id);
  setEditedTask({ title: task.title, description: task.description });
};



return(
  <div>
    <h2>Not completed</h2>
    {notCompleted.map((task) => (
      <div key={task.id} className="task">
        {displayState === task.id ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            updateHandler(task.id, editedTask.title, editedTask.description);
            setDisplayState(null);
          }}>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              placeholder="Edit title"
            />
            <input
              type="text"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              placeholder="Edit description"
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => completedHandler(task.id)}>{task.completed ? 'Mark as Not Completed' : 'Mark as Completed'}</button>
            <button onClick={() => deleteHandler(task.id)}>Delete</button>
            <button onClick={() => handleEditClick(task)}>Edit</button>
          </>
        )}
      </div>
    ))}

  </div>
);
}}
export default DisplayTask