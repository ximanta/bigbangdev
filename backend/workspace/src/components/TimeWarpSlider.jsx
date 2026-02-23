import React from 'react';
import { useStellarNavigator } from '../context/StellarNavigatorContext.jsx';

function TimeWarpSlider() {
  const { timeWarpSpeed, setTimeWarpSpeed } = useStellarNavigator();

  const handleChange = (event) => {
    setTimeWarpSpeed(Number(event.target.value));
  };

  return (
    <div className="time-warp-slider-container">
      <label
        htmlFor="time-warp-slider"
        className="time-warp-label"
      >
        Time Warp: {timeWarpSpeed}x
      </label>
      <input
        type="range"
        id="time-warp-slider"
        min="0.1"
        max="10"
        step="0.1"
        value={timeWarpSpeed}
        onChange={handleChange}
        className="time-warp-slider"
        aria-valuetext={`Current time warp speed is ${timeWarpSpeed} times normal.`}
      />
    </div>
  );
}

export default TimeWarpSlider;