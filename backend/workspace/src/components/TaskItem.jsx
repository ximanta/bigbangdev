import React, { useState } from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';

function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editTitle);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        aria-label={`Mark ${task.title} as complete`}
      />

      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="task-item-edit-input"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSaveEdit();
            if (e.key === 'Escape') handleCancelEdit();
          }}
          aria-label="Edit task title"
        />
      ) : (
        <span className="task-item-title">{task.title}</span>
      )}

      <div className="task-item-actions">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="btn-icon"
              aria-label="Save edit"
            >
              <Check />
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-icon"
              aria-label="Cancel edit"
            >
              <X />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="btn-icon"
              aria-label="Edit task"
            >
              <Edit />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="btn-icon btn-delete"
              aria-label="Delete task"
            >
              <Trash2 />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
