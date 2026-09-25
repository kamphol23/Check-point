import { TbChevronRight, TbBolt } from "react-icons/tb";

import "./styling/TaskCard.css";

function TaskCard({ task, onOpenTask, status }) {
  return (
    <button
      type='button'
      className={`task-card ${status}`}
      onClick={() => onOpenTask(task)}>
      <div className='task-card-header'>
        <div>
          <h3>{task.title}</h3>

          {status === "active" && (
            <span className='task-status-badge'>
              <TbBolt size={14} />
              Aktiv nu
            </span>
          )}
        </div>

        <div className='task-open-indicator'>
          <span>Öppna</span>
          <TbChevronRight size={18} />
        </div>
      </div>

      {task.description && (
        <p className='task-description'>{task.description}</p>
      )}

      <div className='task-card-footer'>
        <div className='task-card-meta'>
          <span className='task-points'>{task.points} Credits</span>

          {task.due_date && (
            <span
              className={`task-due-date ${
                new Date(task.due_date) < new Date() ? "overdue" : ""
              }`}>
              📅 {new Date(task.due_date).toLocaleDateString("sv-SE")}
            </span>
          )}
        </div>

        {task.assigned_to?.trim() && (
          <div className='task-user-wrapper'>
            <div className='task-user'>
              {task.assigned_to.charAt(0).toUpperCase()}
            </div>

            <div className='user-tooltip'>{task.assigned_to}</div>
          </div>
        )}
      </div>
    </button>
  );
}

export default TaskCard;
