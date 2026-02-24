import React from 'react';

function DatePicker({ label, id, value, onChange, required = false }) {
  return (
    <Input
      label={label}
      id={id}
      type="date"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

export default DatePicker;
