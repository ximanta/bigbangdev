import React from 'react';

const Checkbox = ({ label, checked, onChange, name, className = '', ...props }) => {
  return (
    <div className={`checkbox-group ${className}`.trim()}>
      <input
        type="checkbox"
        id={name || label}
        name={name || label}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && <label htmlFor={name || label}>{label}</label>}
    </div>
  );
};

export default Checkbox;