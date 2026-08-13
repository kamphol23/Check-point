import { useState } from "react";
import { addTask } from "../api/addToDb";

import "./styling/AddTask.css";

import Button from "../components/Button";
import { Form } from "react-router-dom";

function AddTask({ setTasks, listId }) {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPoints, setNewPoints] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskChange = (event) => setNewTask(event.target.value);
  const handleDescriptionChange = (event) =>
    setNewDescription(event.target.value);
  const handlePointsChange = (event) =>
    setNewPoints(parseInt(event.target.value) || 0);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const createTask = async (e) => {
    if (!newTask.trim()) {
      alert("Task name cannot be empty.");
      return;
    }
    try {
      const data = await addTask(newTask, listId, newDescription, newPoints);
      console.log(data);

      setTasks((prevTasks) => [...prevTasks, data[0]]);
      setNewTask("");
      setNewDescription("");
      setNewPoints();
      toggleModal();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };
  return (
    <div className='add-task-container'>
      <Button style='callToAction' onClick={() => toggleModal()}>
        Add new task
      </Button>

      {isModalOpen && (
        <div className='modal'>
          <form className='content' onSubmit={createTask}>
            <span className='close' onClick={toggleModal}>
              &times;
            </span>
            <h1>Add Task</h1>

            <div className='content-wrapper'>
              <input
                type='text'
                placeholder='Enter a task'
                value={newTask}
                onChange={handleTaskChange}
              />

              <h3>Description</h3>
              <textarea
                placeholder='Enter description...'
                value={newDescription}
                onChange={handleDescriptionChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    createTask(e);
                  }
                }}
              />

              <p>Poäng</p>
              <input
                type='number'
                placeholder='Enter points...'
                value={newPoints}
                onChange={handlePointsChange}
              />
            </div>

            <div className='addTaskBtnWrapper'>
              <Button style='callToAction' type='submit'>
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTask;
