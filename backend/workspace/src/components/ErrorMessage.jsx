import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      Error: {message}
    </div>
  );
}

export default ErrorMessage;