import React from 'react';

function EmptyState({ filter }) {
  let message = 'No tasks yet! Add one above.';
  if (filter === 'active') {
    message = 'No active tasks. Time to add some!';
  } else if (filter === 'completed') {
    message = 'No completed tasks yet.';
  }

  return (
    <div className="empty-state">
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
