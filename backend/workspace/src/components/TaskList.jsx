import React from 'react';
import TaskItem from './TaskItem';

function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
