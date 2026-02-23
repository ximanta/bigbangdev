import React from 'react';

const InputField = ({ label, type = 'text', name, value, onChange, placeholder, className = '', isMultiLine = false, ...props }) => {
  const InputComponent = isMultiLine ? 'textarea' : 'input';
  const inputClass = isMultiLine ? 'form-control textarea-control' : 'form-control';

  return (
    <div className={`form-group ${className}`.trim()}>
      {label && <label htmlFor={name || label}>{label}</label>}
      <InputComponent
        type={type}
        id={name || label}
        name={name || label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
        {...props}
      />
    </div>
  );
};

export default InputField;