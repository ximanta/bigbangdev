import React from 'react';

const DatePicker = ({ label, value, onChange, name, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`.trim()}>
      {label && <label htmlFor={name || label}>{label}</label>}
      <input
        type="date"
        id={name || label}
        name={name || label}
        value={value}
        onChange={onChange}
        className="form-control"
        {...props}
      />
    </div>
  );
};

export default DatePicker;