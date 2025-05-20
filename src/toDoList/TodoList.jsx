import { useState } from "react";
import './TodoList.css' 

import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";
import CompletedTask from "./CompletedTask";

function ToDoList({balance,setBalance}) {
    const [tasks, setTasks] = useState([{
            Task : 'Clear your room',
            Description : 'Get all the socks of theasdasdasdasdasdasdasdasdasdasd floor you little pig',
            Points : 50,
            Date : '2021-08-12',
            isCompleted : false,
            },]);
const [completedTasks, setCompletedTasks] = useState([])

    function deleteTask(index) {

        const updatedList = tasks.filter((_,i) => i !== index)
        setTasks(updatedList)
        
    }
    function deleteCompletedTask(index) {

        const updatedList = completedTasks.filter((_,i) => i !== index)
        setCompletedTasks(updatedList)
        
    }

    // lägger till completed task i completed task array och tar bort den från tasks array
    // och lägger till poängen i balansen
    function handleComplete(index) {
        const task = tasks[index]
        task.isCompleted = !task.isCompleted
        setTasks([...tasks.filter((_,i) => i !== index)])
        setBalance(balance + Number(task.Points))
        setCompletedTasks([...completedTasks,task])
    }

    // tar bort completed task från completed task array och lägger till den i tasks array
    // och tar bort poängen från balansen
    function handleUnComplete(index) {
        const task = completedTasks[index]
        task.isCompleted = !task.isCompleted
        setCompletedTasks([...completedTasks.filter((_,i) => i !== index)])
        setBalance(balance - task.Points)
        setTasks([...tasks,task])
    }

    return(
        <div className="toDoList">
          
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1>To do list</h1>   
                    <AddTask setTasks={setTasks}/>
                 </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <DisplayTask tasks={tasks} deleteTask={deleteTask} handleComplete={handleComplete}/>  

                    <div className="balance-completedTask-wrapper" >
                        
                        <div className="balance">{balance}</div>
                         <CompletedTask completedTasks={completedTasks} 
                         handleUnComplete={handleUnComplete} deleteCompletedTask={deleteCompletedTask}/>                   
                        </div> 
                    </div>    
                </div>
    )
}

export default ToDoList