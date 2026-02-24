import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function Alert({ message, type = 'info', onClose, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass}>
      <span>{message}</span>
      {onClose && (
        <button onClick={() => setIsVisible(false)} className="alert-close-button">
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default Alert;
