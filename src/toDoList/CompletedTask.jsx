import './TodoList.css'
import { useState } from 'react'
const CompletedTask = ({completedTasks,handleUnComplete,deleteCompletedTask}) =>{
   
    return(
        <div className='completed-task-wrapper'>
        <h2>Completed Task</h2>   
        <div className="completed-task">
            {completedTasks.map((task,index) => (
                <div key={index} className="completed-task-item">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>                 
                    <button onClick={() => handleUnComplete(task)}>Uncomplete</button> 
                   
                   
                </div>
            ))}
        </div>
       </div>
    )
}
export default CompletedTask