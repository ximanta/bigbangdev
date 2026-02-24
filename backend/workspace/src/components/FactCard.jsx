import React from 'react';

const FactCard = ({ label, value }) => {
  return (
    <div
      className="fact-card"
    >
      <div
        className="fact-card-label"
      >
        {label}
      </div>
      <div
        className="fact-card-value"
      >
        {value}
      </div>
    </div>
  );
};

export default FactCard;
