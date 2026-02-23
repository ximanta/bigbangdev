import React, { useState } from 'react';

function SettingsPage() {
  const [graphicsQuality, setGraphicsQuality] = useState('high');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleGraphicsChange = (event) => {
    setGraphicsQuality(event.target.value);
    // In a real app, this would trigger a graphics setting update
    console.log(`Graphics quality set to: ${event.target.value}`);
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    // In a real app, this would toggle sound effects
    console.log(`Sound ${!soundEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        Settings
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="graphics-quality"
          style={{ display: 'block', marginBottom: '10px', fontSize: '1.1em' }}
        >
          Graphics Quality:
        </label>
        <select
          id="graphics-quality"
          className="input-field"
          value={graphicsQuality}
          onChange={handleGraphicsChange}
          style={{ width: 'auto', minWidth: '150px' }}
        >
          <option value="low">
            Low
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="high">
            High
          </option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="sound-toggle"
          style={{ display: 'block', marginBottom: '10px', fontSize: '1.1em' }}
        >
          Sound Effects:
        </label>
        <button
          id="sound-toggle"
          className={`button ${soundEnabled ? 'primary' : ''}`}
          onClick={handleSoundToggle}
        >
          {soundEnabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #30363d' }}>
        <h2 style={{ fontSize: '1.5em', marginBottom: '15px', color: '#58a6ff' }}>
          About Stellar Navigator
        </h2>
        <p style={{ fontSize: '0.9em', lineHeight: '1.6' }}>
          Version: 1.0.0
        </p>
        <p style={{ fontSize: '0.9em', lineHeight: '1.6' }}>
          Data powered by NASA & ESA. Developed with React & Vite.
        </p>
      </div>
    </div>
  );
}

export default SettingsPage;