import { useEffect, useState } from "react";
import {
  TbX,
  TbCheck,
  TbTrash,
  TbCircleCheck,
  TbCalendar,
  TbUser,
  TbCoin,
  TbPlayerPlay,
  TbArrowsExchange,
} from "react-icons/tb";

import "./styling/EditTask.css";

function EditTask({
  task,
  onClose,
  onSave,
  onComplete,
  onDelete,
  onRewive,
  onStartTask,
  activeTaskId,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!task) return;

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPoints(task.points || 0);
    setAssignedTo(task.assigned_to || "");
    setDueDate(task.due_date || "");
    setError("");
  }, [task]);

  const handleClose = () => {
    setError("");
    onClose();
  };

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
      title: title.trim(),
      description: description.trim(),
      points,
      assigned_to: assignedTo.trim(),
      due_date: dueDate,
    };

    const result = await onSave(updatedTask);

    if (result?.success === false) {
      setError(result.error || "Kunde inte spara ändringarna.");
      return;
    }

    handleClose();
  };

  /*
   * Skicka tasken för godkännande
   */
  const handleComplete = async () => {
    if (!task) return;

    try {
      if (onRewive) {
        await onRewive(task);
      } else if (onComplete) {
        await onComplete(task);
      }

      handleClose();
    } catch (error) {
      console.error(error);
      setError("Kunde inte skicka uppgiften för godkännande.");
    }
  };

  /*
   * Gör tasken till aktiv task
   */
  const handleStartTask = async () => {
    if (!task || !onStartTask) return;

    try {
      setError("");

      await onStartTask(task);

      handleClose();
    } catch (error) {
      console.error(error);
      setError("Kunde inte göra uppgiften aktiv.");
    }
  };

  /*
   * Ta bort task
   */
  const handleDelete = async () => {
    if (!task) return;

    const confirmed = window.confirm(
      `Är du säker på att du vill ta bort "${task.title}"?`,
    );

    if (!confirmed) return;

    try {
      if (onDelete) {
        await onDelete(task.id);
      }

      handleClose();
    } catch (error) {
      console.error(error);
      setError("Kunde inte ta bort uppgiften.");
    }
  };

  if (!task) return null;

  const isActive = String(task.id) === String(activeTaskId);

  const isPending = task.complet_request && !task.completed;

  const isCompleted = task.completed;

  return (
    <>
      <div className='edit-task-overlay' onClick={handleClose} />

      <aside className='edit-task-drawer' aria-label='Redigera uppgift'>
        <div className='edit-task-header'>
          <div>
            <span className='edit-task-eyebrow'>Uppgift</span>

            <h2>Redigera uppgift</h2>

            <p className='edit-task-subtitle'>
              Uppdatera information och hantera uppgiften.
            </p>
          </div>

          <button
            type='button'
            className='close-button'
            onClick={handleClose}
            aria-label='Stäng'>
            <TbX size={22} />
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className='form-error'>
            <span className='form-error-icon'>!</span>

            <div>
              <strong>Något gick fel</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className='edit-task-form'>
          {/* INFORMATION */}
          <div className='form-section'>
            <div className='form-section-header'>
              <div>
                <span className='form-section-eyebrow'>Information</span>

                <h3>Uppgiftsdetaljer</h3>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='task-title'>Titel</label>

              <input
                id='task-title'
                type='text'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                placeholder='T.ex. Städa köket'
                className={!title.trim() ? "input-error" : ""}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='task-description'>Beskrivning</label>

              <textarea
                id='task-description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Beskriv vad som behöver göras...'
              />
            </div>
          </div>

          {/* INSTÄLLNINGAR */}
          <div className='form-section'>
            <div className='form-section-header'>
              <div>
                <span className='form-section-eyebrow'>Inställningar</span>

                <h3>Uppgiftsinformation</h3>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='task-points'>
                  <span className='label-with-icon'>
                    <TbCoin size={16} />
                    Credits
                  </span>
                </label>

                <input
                  id='task-points'
                  type='number'
                  min='1'
                  value={points}
                  onChange={(e) => {
                    setPoints(Number(e.target.value));
                    setError("");
                  }}
                  className={points <= 0 ? "input-error" : ""}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='task-assigned'>
                  <span className='label-with-icon'>
                    <TbUser size={16} />
                    Tilldelad
                  </span>
                </label>

                <input
                  id='task-assigned'
                  type='text'
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder='Ingen'
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='task-due-date'>
                <span className='label-with-icon'>
                  <TbCalendar size={16} />
                  Förfallodatum
                </span>
              </label>

              <input
                id='task-due-date'
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className='task-info'>
            <div className='task-info-row'>
              <span>Status</span>

              <strong
                className={
                  isCompleted
                    ? "status completed"
                    : isPending
                      ? "status pending"
                      : isActive
                        ? "status active"
                        : "status inactive"
                }>
                <span className='status-dot' />

                {isCompleted
                  ? "Godkänd"
                  : isPending
                    ? "Väntar på godkännande"
                    : isActive
                      ? "Aktiv"
                      : "Pågående"}
              </strong>
            </div>

            {task.assigned_to && (
              <div className='task-info-row'>
                <span>Tilldelad till</span>

                <strong>{task.assigned_to}</strong>
              </div>
            )}
          </div>

          {/* ÅTGÄRDER */}
          <div className='task-actions-section'>
            <div className='actions-heading'>
              <span className='form-section-eyebrow'>ÅTGÄRDER</span>

              <h3>Hantera uppgift</h3>
            </div>

            {!isActive && !isCompleted && !isPending && (
              <>
                <div className='start-task-action'>
                  <div className='action-card-icon'>
                    <TbPlayerPlay size={20} />
                  </div>

                  <div className='action-card-content'>
                    <span className='action-card-label'>Nästa uppgift</span>
                    <strong>Börja jobba på den</strong>
                    <p>Gör denna till din aktiva uppgift.</p>
                  </div>

                  <button
                    type='button'
                    className='start-task-btn'
                    onClick={handleStartTask}>
                    <TbPlayerPlay size={18} />
                    Starta
                  </button>
                </div>

                {activeTaskId && (
                  <div className='switch-task-info'>
                    <div className='switch-task-icon'>
                      <TbArrowsExchange size={18} />
                    </div>

                    <div>
                      <strong>Du jobbar redan på en annan uppgift</strong>
                      <p>
                        Om du börjar på denna ersätter den din nuvarande aktiva
                        uppgift.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {!isCompleted && !isPending && (
              <div className='submit-review-section'>
                <div className='submit-review-divider'>
                  <span>När uppgiften är klar</span>
                </div>

                <div className='submit-review-action'>
                  <div className='submit-review-icon'>
                    <TbCircleCheck size={21} />
                  </div>

                  <div className='submit-review-content'>
                    <span className='submit-review-label'>Slutför uppgift</span>
                    <strong>Skicka för godkännande</strong>
                    <p>
                      En admin kontrollerar uppgiften innan dina Credits
                      godkänns.
                    </p>
                  </div>

                  <button
                    type='button'
                    className='submit-review-btn'
                    onClick={handleComplete}>
                    Skicka
                    <TbCheck size={18} />
                  </button>
                </div>
              </div>
            )}

            {isPending && !isCompleted && (
              <div className='pending-review'>
                <div className='pending-review-icon'>
                  <TbCircleCheck size={21} />
                </div>

                <div>
                  <strong>Väntar på godkännande</strong>

                  <p>
                    Uppgiften är inskickad och väntar på att en admin ska
                    kontrollera den.
                  </p>
                </div>
              </div>
            )}

            {isCompleted && (
              <div className='approved-task'>
                <div className='approved-task-icon'>
                  <TbCheck size={21} />
                </div>

                <div>
                  <strong>Uppgiften är godkänd</strong>

                  <p>En admin har godkänt uppgiften.</p>
                </div>
              </div>
            )}

            {/* SAVE */}
            <div className='edit-task-actions'>
              <button
                type='button'
                className='cancel-btn'
                onClick={handleClose}>
                Avbryt
              </button>

              <button type='submit' className='save-btn'>
                <TbCheck size={18} />
                Spara ändringar
              </button>
            </div>
          </div>

          {/* DELETE */}
          <div className='danger-zone'>
            <div className='danger-content'>
              <div className='danger-icon'>
                <TbTrash size={18} />
              </div>

              <div>
                <h3>Ta bort uppgift</h3>

                <p>Uppgiften tas bort permanent och kan inte återställas.</p>
              </div>
            </div>

            <button type='button' className='delete-btn' onClick={handleDelete}>
              <TbTrash size={18} />
              Ta bort
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default EditTask;
