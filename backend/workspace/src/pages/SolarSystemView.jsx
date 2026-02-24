import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Settings } from 'lucide-react';
import { celestialBodies } from '../data/celestialBodies';
import LoadingSpinner from '../components/LoadingSpinner';
import PlanetOrbitalItem from '../components/PlanetOrbitalItem';

const SolarSystemView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  useEffect(() => {
    // Simulate loading time for the 3D model
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSpeedChange = (event) => {
    setAnimationSpeed(parseFloat(event.target.value));
  };

  const getOrbitProps = (bodyId) => {
    switch (bodyId) {
      case 'sun':
        return { orbitRadius: 0, planetSize: 100, orbitSpeed: 0, initialAngle: 0 };
      case 'mercury':
        return { orbitRadius: 100, planetSize: 15, orbitSpeed: 10, initialAngle: 0 };
      case 'venus':
        return { orbitRadius: 140, planetSize: 20, orbitSpeed: 15, initialAngle: 90 };
      case 'earth':
        return { orbitRadius: 180, planetSize: 22, orbitSpeed: 20, initialAngle: 180 };
      case 'moon':
        return { orbitRadius: 20, planetSize: 8, orbitSpeed: 2, initialAngle: 0 }; // Relative to earth
      case 'mars':
        return { orbitRadius: 220, planetSize: 18, orbitSpeed: 25, initialAngle: 270 };
      case 'jupiter':
        return { orbitRadius: 300, planetSize: 40, orbitSpeed: 35, initialAngle: 45 };
      case 'io':
        return { orbitRadius: 30, planetSize: 10, orbitSpeed: 3, initialAngle: 0 };
      case 'europa':
        return { orbitRadius: 35, planetSize: 9, orbitSpeed: 4, initialAngle: 90 };
      case 'ganymede':
        return { orbitRadius: 45, planetSize: 12, orbitSpeed: 6, initialAngle: 180 };
      case 'callisto':
        return { orbitRadius: 55, planetSize: 11, orbitSpeed: 8, initialAngle: 270 };
      case 'saturn':
        return { orbitRadius: 380, planetSize: 35, orbitSpeed: 45, initialAngle: 135 };
      case 'uranus':
        return { orbitRadius: 450, planetSize: 30, orbitSpeed: 60, initialAngle: 225 };
      case 'neptune':
        return { orbitRadius: 520, planetSize: 28, orbitSpeed: 70, initialAngle: 315 };
      default:
        return { orbitRadius: 0, planetSize: 10, orbitSpeed: 0, initialAngle: 0 };
    }
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  const planetsAndSun = celestialBodies.filter(
    (body) => body.type === 'planet' || body.type === 'star'
  );

  const moons = celestialBodies.filter(
    (body) => body.type === 'moon'
  );

  return (
    <div
      className="solar-system-view"
    >
      <div
        className="solar-system-controls"
      >
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={animationSpeed}
          onChange={handleSpeedChange}
          className="speed-control-slider"
          aria-label="Animation speed control"
        />
        <button
          onClick={() => navigate('/settings')}
          className="icon-button"
          aria-label="Settings"
        >
          <Settings
            size={20}
          />
        </button>
        <button
          onClick={() => navigate('/about')}
          className="icon-button"
          aria-label="About"
        >
          <Info
            size={20}
          />
        </button>
      </div>

      <div
        className="solar-system-display"
        style={{
          transform: 'scale(0.8)'
        }}
      >
        {/* Sun in the center */}
        <div
          className="planet-item sun-item"
          onClick={() => navigate('/body/sun')}
        >
          Sun
        </div>

        {planetsAndSun.map((body) => {
          if (body.id === 'sun') return null;

          const {
            orbitRadius,
            planetSize,
            orbitSpeed,
            initialAngle
          } = getOrbitProps(body.id);

          // For Earth's moon, we need to place it relative to Earth
          const earthOrbitProps = getOrbitProps('earth');

          const relevantMoons = moons.filter(
            (moon) => moon.parentBodyId === body.id
          );

          return (
            <div
              key={body.id}
            >
              <PlanetOrbitalItem
                body={body}
                orbitRadius={orbitRadius}
                planetSize={planetSize}
                orbitSpeed={orbitSpeed / animationSpeed}
                initialAngle={initialAngle}
              />
              {body.id === 'earth' && (
                relevantMoons.map((moon) => {
                  const {
                    orbitRadius: moonOrbitRadius,
                    planetSize: moonPlanetSize,
                    orbitSpeed: moonOrbitSpeed,
                    initialAngle: moonInitialAngle
                  } = getOrbitProps(moon.id);
                  return (
                    <div
                      key={moon.id}
                      className="planet-orbit"
                      style={{
                        width: `${earthOrbitProps.orbitRadius * 2}px`,
                        height: `${earthOrbitProps.orbitRadius * 2}px`,
                        top: `calc(50% - ${earthOrbitProps.orbitRadius}px)`,
                        left: `calc(50% - ${earthOrbitProps.orbitRadius}px)`,
                        animationDuration: `${earthOrbitProps.orbitSpeed / animationSpeed}s`,
                        animationDelay: `-${earthOrbitProps.initialAngle / 360 * (earthOrbitProps.orbitSpeed / animationSpeed)}s`,
                        border: 'none'
                      }}
                    >
                      <div
                        className="planet-wrapper"
                        style={{
                          transform: `translateX(${earthOrbitProps.orbitRadius}px)`
                        }}
                      >
                        {/* Moon wrapper relative to its parent (Earth) */}
                        <div
                          className="planet-orbit"
                          style={{
                            width: `${moonOrbitRadius * 2}px`,
                            height: `${moonOrbitRadius * 2}px`,
                            top: `calc(50% - ${moonOrbitRadius}px)`,
                            left: `calc(50% - ${moonOrbitRadius}px)`,
                            animationDuration: `${moonOrbitSpeed / animationSpeed}s`,
                            animationDelay: `-${moonInitialAngle / 360 * (moonOrbitSpeed / animationSpeed)}s`,
                            border: '1px dashed rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <div
                            className="planet-wrapper"
                            style={{
                              transform: `translateX(${moonOrbitRadius}px)`
                            }}
                          >
                            <div
                              className="planet-item"
                              style={{
                                width: `${moonPlanetSize}px`,
                                height: `${moonPlanetSize}px`
                              }}
                              onClick={() => navigate(`/body/${moon.id}`)}
                            >
                              {moon.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {body.id === 'jupiter' && (
                relevantMoons.map((moon) => {
                  const {
                    orbitRadius: moonOrbitRadius,
                    planetSize: moonPlanetSize,
                    orbitSpeed: moonOrbitSpeed,
                    initialAngle: moonInitialAngle
                  } = getOrbitProps(moon.id);

                  // Position relative to Jupiter
                  // This is a simplification; a full 3D would handle this dynamically
                  const jupiterOrbitProps = getOrbitProps('jupiter');

                  return (
                    <div
                      key={moon.id}
                      className="planet-orbit"
                      style={{
                        width: `${jupiterOrbitProps.orbitRadius * 2}px`,
                        height: `${jupiterOrbitProps.orbitRadius * 2}px`,
                        top: `calc(50% - ${jupiterOrbitProps.orbitRadius}px)`,
                        left: `calc(50% - ${jupiterOrbitProps.orbitRadius}px)`,
                        animationDuration: `${jupiterOrbitProps.orbitSpeed / animationSpeed}s`,
                        animationDelay: `-${jupiterOrbitProps.initialAngle / 360 * (jupiterOrbitProps.orbitSpeed / animationSpeed)}s`,
                        border: 'none' /* Hide parent orbit for moons */
                      }}
                    >
                      <div
                        className="planet-wrapper"
                        style={{
                          transform: `translateX(${jupiterOrbitProps.orbitRadius}px)`
                        }}
                      >
                        <div
                          className="planet-orbit"
                          style={{
                            width: `${moonOrbitRadius * 2}px`,
                            height: `${moonOrbitRadius * 2}px`,
                            top: `calc(50% - ${moonOrbitRadius}px)`,
                            left: `calc(50% - ${moonOrbitRadius}px)`,
                            animationDuration: `${moonOrbitSpeed / animationSpeed}s`,
                            animationDelay: `-${moonInitialAngle / 360 * (moonOrbitSpeed / animationSpeed)}s`,
                            border: '1px dashed rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <div
                            className="planet-wrapper"
                            style={{
                              transform: `translateX(${moonOrbitRadius}px)`
                            }}
                          >
                            <div
                              className="planet-item"
                              style={{
                                width: `${moonPlanetSize}px`,
                                height: `${moonPlanetSize}px`
                              }}
                              onClick={() => navigate(`/body/${moon.id}`)}
                            >
                              {moon.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes orbit-rotation {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .planet-orbit {
              animation-play-state: running;
            }
          `
        }}
      />
    </div>
  );
};

export default SolarSystemView;
