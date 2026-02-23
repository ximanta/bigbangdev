import React from 'react';

const ToggleSwitch = ({ label, checked, onChange, name, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`.trim()}>
      {label && <label htmlFor={name || label}>{label}</label>}
      <label className="toggle-switch">
        <input
          type="checkbox"
          id={name || label}
          name={name || label}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;