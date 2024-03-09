// App.js
import React, { useState, useEffect } from 'react';
import BoardColumn from './BoardColumn';
import TaskModal from './TaskModal';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAddition = (title, status, description) => {
    const newTask = { id: Date.now(), title, status, description };
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleTaskDeletion = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDrop = (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    handleTaskUpdate(updatedTask);
  };

  return (
    <div className="app-container">
      <h1>Project Board</h1>
      <div className="board">
        <BoardColumn
          status="To Do"
          tasks={tasks.filter((task) => task.status === 'To Do')}
          onTaskClick={(task) => setSelectedTask(task)}
          onDrop={handleDrop}
        />
        <BoardColumn
          status="In Progress"
          tasks={tasks.filter((task) => task.status === 'In Progress')}
          onTaskClick={(task) => setSelectedTask(task)}
          onDrop={handleDrop}
        />
        <BoardColumn
          status="Done"
          tasks={tasks.filter((task) => task.status === 'Done')}
          onTaskClick={(task) => setSelectedTask(task)}
          onDrop={handleDrop}
        />
      </div>
      <button className="add-button" onClick={() => setShowModal(true)}>
        + New Task
      </button>
      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onSave={handleTaskAddition}
        />
      )}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleTaskUpdate}
          onDelete={handleTaskDeletion}
        />
      )}
    </div>
  );
};

export default App;
