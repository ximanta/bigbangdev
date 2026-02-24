import React from 'react';

function RadioGroup({ label, name, options, selectedValue, onChange, required = false }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="radio-options-container">
        {options.map((option) => (
          <div key={option.value} className="radio-group">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              required={required}
            />
            <label htmlFor={`${name}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
