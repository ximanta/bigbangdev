import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, duration = 5000, onClose }) => {
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

  let icon;
  let alertClass = 'alert';

  switch (type) {
    case 'success':
      icon = <CheckCircle size={20} />;
      alertClass += ' alert-success';
      break;
    case 'error':
      icon = <XCircle size={20} />;
      alertClass += ' alert-error';
      break;
    case 'info':
    default:
      icon = <Info size={20} />;
      alertClass += ' alert-info';
      break;
  }

  return (
    <div className={alertClass} role="alert">
      {icon}
      <span>{message}</span>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;