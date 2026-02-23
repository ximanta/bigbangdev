import React from 'react';

const RadioGroup = ({ label, name, options, selectedValue, onChange, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`.trim()}>
      {label && <label>{label}</label>}
      <div className="radio-group">
        {options.map((option, index) => (
          <React.Fragment key={option.value || index}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              {...props}
            />
            <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;