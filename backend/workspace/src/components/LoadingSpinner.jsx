import React from 'react';
import { Orbit } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
      <p>Loading Cosmic Guide...</p>
    </div>
  );
}

export default LoadingSpinner;