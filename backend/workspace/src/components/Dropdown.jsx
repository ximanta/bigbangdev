import React from 'react';

const Dropdown = ({ label, name, value, onChange, options, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`.trim()}>
      {label && <label htmlFor={name || label}>{label}</label>}
      <select
        id={name || label}
        name={name || label}
        value={value}
        onChange={onChange}
        className="select-control"
        {...props}
      >
        {options.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;