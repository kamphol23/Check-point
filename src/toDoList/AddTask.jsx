import { useState } from "react";
import { addTask } from "../api/addToDb";

import "./styling/AddTask.css";
import Button from "../components/Button";

function AddTask({ setTasks, listId }) {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPoints, setNewPoints] = useState("");
  const [newTaskDay, setNewTaskDay] = useState("");
  const [newAssignedTo, setNewAssignedTo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setNewTask("");
    setNewDescription("");
    setNewPoints("");
    setNewTaskDay("");
    setNewAssignedTo("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const createTask = async (event) => {
    event.preventDefault();

    // Kontrollera task-namn
    if (!newTask.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    // Kontrollera poäng
    const points = Number(newPoints);

    if (!newPoints || points <= 0) {
      alert("Points must be greater than 0.");
      return;
    }

    try {
      setIsSaving(true);

      const data = await addTask(
        newTask.trim(),
        listId,
        newDescription.trim(),
        points,
        newTaskDay || null,
        newAssignedTo.trim(),
      );

      // Lägg till den nya tasken direkt i UI
      if (data?.[0]) {
        setTasks((prevTasks) => [...prevTasks, data[0]]);
      }

      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='add-task-container'>
      <Button style='callToAction' onClick={() => setIsModalOpen(true)}>
        Add new task
      </Button>

      {isModalOpen && (
        <div className='modal'>
          <form className='content' onSubmit={createTask}>
            <button
              type='button'
              className='close'
              onClick={closeModal}
              aria-label='Close'>
              &times;
            </button>

            <h1>Add Task</h1>

            <div className='content-wrapper'>
              <input
                type='text'
                placeholder='Enter a task'
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                autoFocus
              />

              <h3>Description</h3>

              <textarea
                placeholder='Enter description...'
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
              />

              <h3>Points</h3>

              <input
                type='number'
                min='1'
                placeholder='Enter points...'
                value={newPoints}
                onChange={(event) => setNewPoints(event.target.value)}
              />

              <h3>Day the task is due</h3>

              <input
                type='date'
                value={newTaskDay}
                onChange={(event) => setNewTaskDay(event.target.value)}
              />

              <small>Leave empty if the task can be done anytime.</small>

              <h3>Assign to</h3>

              <input
                type='text'
                placeholder='Assign to...'
                value={newAssignedTo}
                onChange={(event) => setNewAssignedTo(event.target.value)}
              />
            </div>

            <div className='addTaskBtnWrapper'>
              <Button style='callToAction' type='submit' disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTask;
