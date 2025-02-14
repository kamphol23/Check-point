import { useState } from "react";
import './TodoList.css' 
function ToDoList() {
    const [tasks, setTasks] = useState([{Task : 'Clear your room', Description : 'Get all the socks of the floor you little pig', Points : 50}]);
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState();
    const [newTaskPoints, setNewTaskPoints] = useState("");
    const  [displayState, setDisplayState] = useState("none");

    function newTaskInputHandler(event) {
        setNewTask(event.target.value);
    }

    function newDescriptionInputHandler(event) {
        setNewDescription(event.target.value);
    }

    function newTaskPointsHandler(event) {
        setNewTaskPoints(event.target.value);
        console.log(newTaskPoints);
        
    }
    function addTask() {

        if(newTask.trim() !== ""){
            setTasks(t => [...t, {Task : newTask, Description : newDescription , Points : newTaskPoints}]);
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
                         <div> 
                            
                          <input
                              type="text"
                              placeholder="Enter a task...."
                              value={newTask}
                              onChange={newTaskInputHandler}/>
                             

                             <input
                              type="text"
                              placeholder="Enter description...."
                              value={newDescription}
                              onChange={newDescriptionInputHandler}/>                        

                             <input
                              type="int"
                              placeholder="Enter Points..."
                              value={newTaskPoints}
                              onChange={newTaskPointsHandler}
                              />
                             <button className="addBtn" onClick={addTask}>Add</button>
                         </div>
                  </div>
            </div>      
            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task.Task}</span>
                        <span>{task.Description}</span>
                        <span>{task.Points}</span>
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