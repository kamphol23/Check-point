import './TodoList.css'
import { useState } from 'react'
function DisplayTask ({tasks,deleteTask}){
const  [displayState, setDisplayState] = useState(null);

    return(
        <ol>
        {tasks.map((task, index) =>
            <li key={index} 
            className="task-display"
            onClick={() => setDisplayState(displayState === index ? null : index)}
            >
                <div >
                  <h3>{task.Task}</h3>

                  <div className={`task-description ${displayState === index ? "expanded" : ""}`}>
                     {task.Description.slice(0, 50)}{displayState === index && task.Description.slice(50)}
                  </div>                   

                  <h3> Reward : {task.Points}</h3>
                      <button
                       className="deleteBtn"
                       onClick={(e) => {
                        deleteTask(index);
                       }}
                       >Delete</button>
                 </div>
            </li>
        )}
    </ol>
    )
}
export default DisplayTask