import React, { useRef } from 'react';

function FileUpload({ label, id, onFileChange, accept = '*' }) {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="file-upload-input" onClick={handleFileClick}>
        Click to upload file
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          onChange={handleChange}
          accept={accept}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}

export default FileUpload;
