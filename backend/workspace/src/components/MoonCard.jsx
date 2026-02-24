import React from 'react';
import { Link } from 'react-router-dom';

function MoonCard({ moon }) {
  return (
    <Link
      to={`/moons/${moon.id}`}
      className="card"
    >
      <div className="card-image-container">
        <img
          src={moon.images[0]}
          alt={moon.name}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">
          {moon.name}
        </h3>
      </div>
    </Link>
  );
}

export default MoonCard;