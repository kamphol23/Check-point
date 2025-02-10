import { useState } from "react";
import './TodoList.css' 
function ToDoList() {
    const [tasks, setTasks] = useState(["Städa vardags rummet", "Hjälpa pappa med städa vinden"]);
    const [newTask, setNewTask] = useState("");
    const  [displayState, setDisplayState] = useState("none");
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {

        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask('');
        }
    }

    function deleteTask(index) {

        const updatedList = tasks.filter((_,i) => i !== index)
        setTasks(updatedList)
    }


    function stateHandler(){
        if(displayState === "none"){
            setDisplayState('block')
        }else{
            setDisplayState("none");
        }
    }
    return(
        <div className="toDoList">

            <h1>To do list</h1>

            <button className="stateBtn" onClick={stateHandler} > Add </button>
            <div className="modal" style={{display:displayState}}>
                 <div className="content">
                     <span className="close"  onClick={stateHandler} >&times;</span>
                     <p>Some text in the Modal..</p>
                  </div>
            </div>      
            <div> 
                <input
                    type="text"
                    placeholder="Enter a task...."
                    value={newTask}
                    onChange={handleInputChange}/>
                <button className="addBtn" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button
                         className="deleteBtn"
                         onClick={() => deleteTask(index)}
                         >Delete</button>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default ToDoList