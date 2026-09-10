import "./styling/TaskCard.css";
import { TbEdit } from "react-icons/tb";

function TaskCard({ task, onEdit }) {
  return (
    <div className='task-card'>
      <div className='title-edit'>
        <h3>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</h3>

        <button className='edit-btn' onClick={() => onEdit(task)}>
          <TbEdit size={20} />
        </button>
      </div>

      <p>
        {task.description.charAt(0).toUpperCase() + task.description.slice(1)}
      </p>

      <div className='task-card-footer'>
        <span className='task-points'>{task.points} Credits</span>

        <span className='task-user'>
          {task.assigned_to !== null
            ? task.assigned_to.charAt(0).toUpperCase()
            : task.assigned_to}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
