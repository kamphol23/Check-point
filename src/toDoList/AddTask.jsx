import { useState } from "react";

function AddTask({ setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTaskPoints, setNewTaskPoints] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 


  const handleTaskChange = (event) => setNewTask(event.target.value);
  const handleDescriptionChange = (event) => setNewDescription(event.target.value);
  const handlePointsChange = (event) => setNewTaskPoints(event.target.value);


  const toggleModal = () => setIsModalOpen(!isModalOpen);
  
  const formatDateISO = (date) => {
    const isoString = date.toISOString();
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};


const currentDate = new Date();

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((tasks) => [
        ...tasks,
        { Task: newTask, Description: newDescription,
          Points: newTaskPoints, Date: formatDateISO(currentDate), isCompleted: false },
      ]);
      setNewTask("");
      setNewDescription("");
      setNewTaskPoints();
      toggleModal(); 
    }
    console.log(newTaskPoints);
    
  };

  return (
    <div>
      <button className="stateBtn" onClick={toggleModal}>Add</button>

      {isModalOpen && (
        <div className="modal">
          <div className="content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h1>Add Task</h1>

            <div className="content-wrapper">
              <input
                type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={handleTaskChange}
              />

              <h3>Description</h3>
              <textarea
                placeholder="Enter description..."
                value={newDescription}
                onChange={handleDescriptionChange}
              />

              <h3>Reward</h3>
              <input
                type="number"         
                placeholder="Enter Points..."
                value={newTaskPoints}
                onChange={handlePointsChange}
              />
            </div>

            <div className="addTaskBtnWrapper">
              <button className="addBtn" onClick={addTask}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
