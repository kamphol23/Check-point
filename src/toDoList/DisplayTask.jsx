import './TodoList.css'
import { useState } from 'react'

function DisplayTask ({notCompleted,completedHandler}){ {
const  [displayState, setDisplayState] = useState(null);

if(notCompleted === undefined || notCompleted.length === 0){
  return <p>No tasks to display.</p>;
}

return(
  <div>
    <h2>Not completed</h2>
    {notCompleted.map((todo) => (
      <div key={todo.id} className="task-item">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <button onClick={() => completedHandler(todo)}>
          Mark as Completed
        </button>
      </div>
    ))}
  </div>
);
}}
export default DisplayTask