// TaskCard.js
import React from 'react';

const TaskCard = ({ task, onClick }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  return (
    <div className="task-card" draggable="true" onDragStart={handleDragStart} onClick={onClick}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
