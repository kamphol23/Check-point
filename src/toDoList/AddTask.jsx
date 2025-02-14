import { useState } from "react"
function AddTask ({setTasks}){
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState("");
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


    function stateHandler(){
        if(displayState === "none"){
            setDisplayState('block')
        }else{
            setDisplayState("none");
        }
    }

    function addTask() {

        if(newTask.trim() !== ""){
            setTasks(t => [...t, {Task : newTask, Description : newDescription , Points : newTaskPoints}]);
            setNewTask('');
            setNewDescription('');
            setNewTaskPoints('');
            stateHandler();
        }
    }
    return(
        <div>
        <button className="stateBtn" onClick={stateHandler} > 
        Add </button> 

        <div className="modal" style={{display:displayState}}>
            
        <div className="content">

        <span className="close"  onClick={stateHandler} >&times;</span>
            <h1>Add Task</h1>          
                <div className="conten-wraper"> 
                    <input
                     type="text"
                     placeholder="Enter a task"
                     value={newTask}
                     onChange={newTaskInputHandler}/>
                    
                    <h3>Description</h3>
                    <textarea
                     type="text"
                     placeholder="Enter description...."
                     value={newDescription}
                     onChange={newDescriptionInputHandler}/>                        

                    <h3>Reward</h3>
                    <input
                     type="int"
                     placeholder="Enter Points..."
                     value={newTaskPoints}
                     onChange={newTaskPointsHandler}
                     />
                    
                </div>
                <div className="addTaskBtnWraper"><button className="addBtn" onClick={addTask}>Submit</button></div>               
         </div>
   </div> 
   </div>
    )
}
export default AddTask