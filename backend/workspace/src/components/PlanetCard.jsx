import React from 'react';
import { Link } from 'react-router-dom';

function PlanetCard({ planet }) {
  const firstFactKey = Object.keys(planet.facts)[0];
  const firstFactValue = planet.facts[firstFactKey];

  return (
    <Link
      to={`/planets/${planet.id}`}
      className="card"
    >
      <div className="card-image-container">
        <img
          src={planet.images[0]}
          alt={planet.name}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">
          {planet.name}
        </h3>
        {
          firstFactKey && firstFactValue && (
            <p className="card-fact">
              {firstFactKey}: {firstFactValue}
            </p>
          )
        }
      </div>
    </Link>
  );
}

export default PlanetCard;