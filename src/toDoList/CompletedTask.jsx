import './TodoList.css'
import { useState } from 'react'
const CompletedTask = ({completedTasks,handleUnComplete,deleteCompletedTask}) =>{
    const  [displayState, setDisplayState] = useState(null);
    return(
        <div className='completed-task-wrapper'>
        <h2>Completed Task</h2>   
        <div className="completed-task">{completedTasks.map((task,index) =>{
            
            return(
                <div key={index} onClick={() => setDisplayState(displayState === index ? null : index)}
                    className={`task-description ${displayState === index ? "expanded" : ""}`}>
                        <h3>{task.Task}</h3>
                            <p>{task.Description}</p>
                            <p>Reward : {task.Points}</p>
                            <p>Task added : {task.Date}</p>
                    <span>
                    <input type="checkbox" onChange={() => handleUnComplete(index)}
                    checked={task.isCompleted}/>
                    <p>Completed</p>
                    <button
                    className={`deleteBtn ${displayState === index ? "expanded" : ""}`}
                    onClick={(e) => {
                        deleteCompletedTask(index);}}
                    >Delete</button>
                    </span>

                </div>
            )
       })}</div>
       </div>
    )
}
export default CompletedTask