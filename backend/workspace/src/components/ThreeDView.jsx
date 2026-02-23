import React from 'react';
import { useStellarNavigator } from '../context/StellarNavigatorContext.jsx';
import celestialBodiesData from '../data/celestialBodies.js';

function CelestialBodyMarker({ body }) {
  const { setSelectedBodyId, selectedBodyId } = useStellarNavigator();
  const isSelected = selectedBodyId === body.id;

  const handleClick = () => {
    setSelectedBodyId(body.id);
  };

  // Positions are normalized (0 to 1) for demonstration
  const style = {
    left: `${body.position.x * 100}%`,
    top: `${body.position.y * 100}%`
  };

  return (
    <div
      className={`celestial-body-marker ${isSelected ? 'selected' : ''}`}
      style={style}
      onClick={handleClick}
      aria-label={`Select ${body.name}`}
      tabIndex="0"
      role="button"
    >
      {body.name.substring(0, 1)}
    </div>
  );
}

function ThreeDView() {
  const { timeWarpSpeed } = useStellarNavigator();

  return (
    <div className="three-d-view">
      <p className="time-warp-label">
        Time Warp Speed: {timeWarpSpeed}x
      </p>
      {celestialBodiesData.map(body => (
        <CelestialBodyMarker
          key={body.id}
          body={body}
        />
      ))}
    </div>
  );
}

export default ThreeDView;