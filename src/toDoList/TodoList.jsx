import { useState } from "react";
import './TodoList.css' 

import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";


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

    function handleComplete(index) {
        const task = tasks[index]
        task.isCompleted = !task.isCompleted
        setTasks([...tasks.filter((_,i) => i !== index)])
        setBalance(balance + task.Points)
        setCompletedTasks([...completedTasks,task])
    }

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
                 <DisplayTask tasks={tasks} deleteTask={deleteTask} handleComplete={handleComplete}/>          
                 <p>{balance}</p>
                 <div>{completedTasks.map((task,index) =>{
                      return(
                          <div key={index}>
                              <h3>{task.Task}</h3>
                              <p>{task.Description}</p>
                              <p>{task.Points}</p>
                              <p>{task.Date}</p>
                              <input type="checkbox" onChange={() => handleUnComplete(index)}
                              checked={task.isCompleted}/>
                          </div>
                      )
                 })}</div>
                </div>
    )
}

export default ToDoList