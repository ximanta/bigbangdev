import React from 'react';

function Textarea({ label, id, value, onChange, placeholder, rows = 4, required = false }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        className="textarea-field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      ></textarea>
    </div>
  );
}

export default Textarea;
