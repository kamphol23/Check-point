import { useState } from "react";
import Button from "../components/Button";

function EditTask({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSave(task.id, title, description);
    onClose();
  };

  return (
    <div className='modal'>
      <form className='content' onSubmit={handleSubmit}>
        <span className='close' onClick={onClose}>
          &times;
        </span>

        <h1>Edit Task</h1>

        <div className='content-wrapper'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h3>Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='addTaskBtnWrapper'>
          <Button style='callToAction' type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
