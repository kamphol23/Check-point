import { useState } from "react";
import "./styling/TaskDescription.css";

function TaskDescription({ text }) {
  const [showFull, setShowFull] = useState(false);

  const isLong = text.length > 50;

  return (
    <p
      style={{ cursor: isLong ? "pointer" : "default" }}
      onClick={() => setShowFull(!showFull)}>
      {showFull || !isLong ? text : `${text.substring(0, 50)} ...`}

      {isLong && (
        <span className='task-text'>
          {showFull ? " show less" : " show more"}
        </span>
      )}
    </p>
  );
}

export default TaskDescription;
