import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;