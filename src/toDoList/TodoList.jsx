import { useState } from "react";
import './TodoList.css' 

import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";

function ToDoList() {
    const [tasks, setTasks] = useState([{Task : 'Clear your room', Description : 'Get all the socks of theasdasdasdasdasdasdasdasdasdasd floor you little pig', Points : 50}]);

    function deleteTask(index) {

        const updatedList = tasks.filter((_,i) => i !== index)
        setTasks(updatedList)
    }
    return(
        <div className="toDoList">

            <h1>To do list</h1>   
            <AddTask setTasks={setTasks}/>
            <DisplayTask tasks={tasks} deleteTask={deleteTask}/>
        </div>
    )
}

export default ToDoList