import React from 'react';

const Notification = ({ message, type, show }) => {
  if (!message) {
    return null;
  }

  const notificationClass = `notification ${type} ${show ? 'show' : ''}`;

  return (
    <div className={notificationClass}>
      {message}
    </div>
  );
};

export default Notification;
