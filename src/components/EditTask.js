import { useEffect, useState } from "react";
import { TbX, TbCheck, TbTrash, TbCircleCheck } from "react-icons/tb";

import "./styling/EditTask.css";

function EditTask({ task, onClose, onSave, onComplete, onDelete }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!task) return;

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPoints(task.points || 0);
    setAssignedTo(task.assigned_to || "");
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Uppgiften måste ha en titel.");
      return;
    }

    if (points <= 0) {
      setError("Credits måste vara större än 0.");
      return;
    }

    setError("");

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

  const handleComplete = async () => {
    if (onComplete) {
      await onComplete(task);
    }

    onClose();
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Är du säker på att du vill ta bort "${task.title}"?`,
    );

    if (!confirmed) return;

    if (onDelete) {
      await onDelete(task.id);
    }

    onClose();
  };

  if (!task) return null;

  return (
    <>
      <div
        className='edit-task-overlay'
        onClick={() => {
          setError("");
          onClose();
        }}
      />

      <aside className='edit-task-drawer'>
        <div className='edit-task-header'>
          <div>
            <span className='edit-task-eyebrow'>Uppgift</span>

            <h2>Redigera uppgift</h2>
          </div>

          <button
            type='button'
            className='close-button'
            onClick={onClose}
            aria-label='Stäng'>
            <TbX size={24} />
          </button>
        </div>
        {error && (
          <div className='form-error'>
            <span>⚠️</span>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className='edit-task-form'>
          <div className='form-group'>
            <label htmlFor='task-title'>Titel</label>

            <input
              id='task-title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='task-description'>Beskrivning</label>

            <textarea
              id='task-description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='task-points'>Credits</label>
              <input
                className={points <= 0 ? "input-error" : ""}
                type='number'
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='task-assigned'>Tilldelad</label>

              <input
                id='task-assigned'
                type='text'
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder='Ingen'
              />
            </div>
          </div>

          <div className='task-info'>
            <div className='task-info-row'>
              <span>Status</span>

              <strong
                className={
                  task.completed ? "status completed" : "status active"
                }>
                <span className='status-dot' />
                {task.completed ? "Klar" : "Aktiv"}
              </strong>
            </div>

            <div className='task-info-row'>
              <span>Credits</span>
              <strong>{points} Credits</strong>
            </div>
          </div>

          <div className='task-actions-section'>
            <h3>Åtgärder</h3>

            {!task.completed && (
              <button
                type='button'
                className='action-btn complete-btn'
                onClick={handleComplete}>
                <span className='action-icon'>
                  <TbCircleCheck size={20} />
                </span>

                <span className='action-text'>
                  <strong>Markera som klar</strong>
                  <small>Slutför uppgiften och få dina Credits</small>
                </span>

                <TbCheck size={20} />
              </button>
            )}

            <div className='edit-task-actions'>
              <button type='button' className='cancel-btn' onClick={onClose}>
                Avbryt
              </button>

              <button type='submit' className='save-btn'>
                Spara ändringar
              </button>
            </div>
          </div>

          <div className='danger-zone'>
            <div>
              <h3>Ta bort uppgift</h3>

              <p>Uppgiften tas bort permanent och kan inte återställas.</p>
            </div>

            <button type='button' className='delete-btn' onClick={handleDelete}>
              <TbTrash size={19} />
              Ta bort
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default EditTask;
