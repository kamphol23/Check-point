import { useState, useEffect } from "react";
import { TbX } from "react-icons/tb";

import "./styling/EditTask.css";

function EditTask({ task, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (!task) return;

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPoints(task.points || 0);
    setAssignedTo(task.assigned_to || "");
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      description,
      points,
      assigned_to: assignedTo,
    };

    await onSave(updatedTask);
    onClose();
  };

  if (!task) return null;

  return (
    <>
      <div className='edit-task-overlay' onClick={onClose} />

      <aside className='edit-task-drawer'>
        <div className='edit-task-header'>
          <h2>Redigera uppgift</h2>

          <button className='close-button' onClick={onClose}>
            <TbX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='edit-task-form'>
          <div className='form-group'>
            <label>Titel</label>

            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Beskrivning</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Poäng</label>

            <input
              type='number'
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>

          <div className='form-group'>
            <label>Tilldelad användare</label>

            <input
              type='text'
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </div>

          <div className='edit-task-actions'>
            <button type='button' className='cancel-btn' onClick={onClose}>
              Avbryt
            </button>

            <button type='submit' className='save-btn'>
              Spara ändringar
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default EditTask;
