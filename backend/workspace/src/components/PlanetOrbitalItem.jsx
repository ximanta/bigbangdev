import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlanetOrbitalItem = (
  {
    body,
    orbitRadius,
    planetSize,
    orbitSpeed,
    initialAngle
  }
) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/body/${body.id}`);
  };

  const animationDelay = `-${initialAngle / 360 * orbitSpeed}s`;

  return (
    <div
      className="planet-orbit"
      style={{
        width: `${orbitRadius * 2}px`,
        height: `${orbitRadius * 2}px`,
        top: `calc(50% - ${orbitRadius}px)`,
        left: `calc(50% - ${orbitRadius}px)`,
        animationDuration: `${orbitSpeed}s`,
        animationDelay: animationDelay
      }}
    >
      <div
        className="planet-wrapper"
        style={{
          transform: `translateX(${orbitRadius}px)`
        }}
      >
        <div
          className="planet-item"
          style={{
            width: `${planetSize}px`,
            height: `${planetSize}px`,
            backgroundColor:
              body.type === 'star'
                ? 'transparent'
                : body.id === 'earth'
                  ? '#00BFFF'
                  : body.id === 'mars'
                    ? '#B22222'
                    : body.id === 'jupiter'
                      ? '#DAA520'
                      : body.id === 'saturn'
                        ? '#F4A460'
                        : body.id === 'uranus'
                          ? '#87CEEB'
                          : body.id === 'neptune'
                            ? '#1E90FF'
                            : '#A9A9A9'
          }}
          onClick={handleClick}
        >
          {body.type !== 'star' && body.name.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default PlanetOrbitalItem;
