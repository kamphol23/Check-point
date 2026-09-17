import "./styling/TaskCard.css";

function TaskCard({ task, onOpenTask, status }) {
  return (
    <button
      type='button'
      className={`task-card ${status}`}
      onClick={() => onOpenTask(task)}>
      <div className='task-card-header'>
        <h3>{task.title}</h3>
        <div className='task-open-indicator'>Visa detaljer </div>
      </div>

      {task.description && (
        <p className='task-description'>{task.description}</p>
      )}

      <div className='task-card-footer'>
        <span className='task-points'>{task.points} Credits</span>

        {task.assigned_to?.trim() && (
          <div className='task-user'>
            {task.assigned_to.trim().charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </button>
  );
}

export default TaskCard;
