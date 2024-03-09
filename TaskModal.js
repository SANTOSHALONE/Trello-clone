// TaskModal.js
import React, { useState } from 'react';

const TaskModal = ({ task, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [status, setStatus] = useState(task ? task.status : 'To Do');
  const [description, setDescription] = useState(task ? task.description : '');

  const handleSave = () => {
    if (task) {
      onSave({ ...task, title, status, description });
    } else {
      onSave(title, status, description);
    }
    onClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        {onDelete && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
};

export default TaskModal;
