import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(taskTitle);
    setTaskTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="task-input-container"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        aria-label="New task title"
      />
      <button
        type="submit"
        className="btn btn-primary"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;
