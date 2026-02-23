import React, { useEffect, useRef, useState } from 'react';
import { useStellarNavigator } from '../context/StellarNavigatorContext.jsx';

function TooltipOverlay() {
  const { onboardingComplete, completeOnboarding } = useStellarNavigator();
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    if (!onboardingComplete && tooltipRef.current) {
      const updatePosition = () => {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Center the tooltip
        setPosition({
          top: `${(viewportHeight - tooltipRect.height) / 2}px`,
          left: `${(viewportWidth - tooltipRect.width) / 2}px`
        });
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [onboardingComplete]);

  if (onboardingComplete) {
    return null;
  }

  return (
    <div
      className="tooltip-overlay"
      ref={tooltipRef}
      style={{ position: 'fixed', ...position }}
    >
      <h3 className="tooltip-title">
        Welcome to Stellar Navigator!
      </h3>
      <p className="tooltip-description">
        Explore the universe in 3D. Click on celestial bodies to learn more, or use the search bar to find specific objects.
      </p>
      <div className="tooltip-actions">
        <button
          className="button primary"
          onClick={completeOnboarding}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default TooltipOverlay;