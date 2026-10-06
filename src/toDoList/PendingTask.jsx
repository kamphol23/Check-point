import { TbChevronRight, TbClock, TbCalendar } from "react-icons/tb";

import "./styling/PendingTask.css";

function PendingTask({ task, onOpenTask }) {
  if (!task) return null;

  const isOverdue = task.due_date && new Date(task.due_date) < new Date();

  return (
    <button
      type='button'
      className='pending-task-card'
      onClick={() => onOpenTask(task)}>
      <div className='pending-task-header'>
        <div className='pending-task-title-wrapper'>
          <h3>{task.title}</h3>

          <span className='pending-task-status'>
            <TbClock size={14} />
            Väntar på godkännande
          </span>
        </div>

        <div className='pending-task-open'>
          <span>Öppna</span>
          <TbChevronRight size={18} />
        </div>
      </div>

      {task.description && (
        <p className='pending-task-description'>{task.description}</p>
      )}

      <div className='pending-task-footer'>
        <div className='pending-task-meta'>
          <span className='pending-task-points'>{task.points} Credits</span>

          {task.due_date && (
            <span
              className={`pending-task-due-date ${isOverdue ? "overdue" : ""}`}>
              <TbCalendar size={14} />
              {new Date(task.due_date).toLocaleDateString("sv-SE", {
                day: "numeric",
                month: "short",
              })}
            </span>
          )}
        </div>

        {task.assigned_to && (
          <div className='pending-task-user-wrapper'>
            <div className='pending-task-user'>
              {task.assigned_to?.trim()?.charAt(0)?.toUpperCase() || "?"}
            </div>

            <div className='pending-task-tooltip'>{task.assigned_to}</div>
          </div>
        )}
      </div>
    </button>
  );
}

export default PendingTask;
