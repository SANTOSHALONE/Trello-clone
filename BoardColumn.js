// BoardColumn.js
import React from 'react';
import TaskCard from './TaskCard';

const BoardColumn = ({ status, tasks, onTaskClick, onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onDrop(taskData, status);
  };

  return (
    <div className="board-column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2>{status}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
      </div>
      <div className="task-count">{tasks.length}</div>
    </div>
  );
};

export default BoardColumn;
