import React from 'react';
import Input from './Input';

function TimePicker({ label, id, value, onChange, required = false }) {
  return (
    <Input
      label={label}
      id={id}
      type="time"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

export default TimePicker;
