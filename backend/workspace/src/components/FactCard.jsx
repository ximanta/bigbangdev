import React from 'react';

function FactCard({ label, value }) {
  return (
    <div className="fact-card">
      <p className="fact-card-label">
        {label}
      </p>
      <p className="fact-card-value">
        {value}
      </p>
    </div>
  );
}

export default FactCard;