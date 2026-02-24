import React from 'react';

function Checkbox({ label, id, checked, onChange }) {
  return (
    <div className="form-group checkbox-group">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}

export default Checkbox;
