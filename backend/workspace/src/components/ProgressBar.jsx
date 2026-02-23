import React from 'react';

const ProgressBar = ({ progress, label, className = '' }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`progress-bar-container ${className}`.trim()}>
      <div
        className="progress-bar-fill"
        style={{ width: `${clampedProgress}%` }}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {label && <span style={{color: 'white', fontSize: '0.7em', paddingLeft: '5px'}}>{label}</span>}
      </div>
    </div>
  );
};

export default ProgressBar;