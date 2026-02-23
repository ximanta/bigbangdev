import React, { useRef } from 'react';

const ImageUpload = ({ label, onFileSelect, className = '', ...props }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`form-group ${className}`.trim()}>
      {label && <label>{label}</label>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        {...props}
      />
      <button type="button" className="btn btn-secondary" onClick={handleClick}>
        Choose Image
      </button>
      {/* Optionally display file name or preview */}
    </div>
  );
};

export default ImageUpload;