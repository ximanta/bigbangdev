import React, { useState } from 'react';
import { Rotate3D, ZoomIn, ZoomOut } from 'lucide-react';

function CelestialBodyProfile({ body }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!body) {
    return <p>No celestial body data available.</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <h3>Overview</h3>
            <p>{body.description}</p>
            <div className="statistics-grid">
              <div className="statistic-card">
                <h4>Diameter</h4>
                <p>{body.diameter}</p>
              </div>
              <div className="statistic-card">
                <h4>Mass</h4>
                <p>{body.mass}</p>
              </div>
              <div className="statistic-card">
                <h4>Distance from Sun</h4>
                <p>{body.distanceFromSun}</p>
              </div>
              <div className="statistic-card">
                <h4>Orbital Period</h4>
                <p>{body.orbitalPeriod}</p>
              </div>
              <div className="statistic-card">
                <h4>Surface Temperature</h4>
                <p>{body.temperature}</p>
              </div>
              <div className="statistic-card">
                <h4>Atmosphere</h4>
                <p>{body.atmosphere}</p>
              </div>
            </div>
          </div>
        );
      case 'geology':
        return (
          <div className="tab-content">
            <h3>Geology & Surface</h3>
            <p>{body.geology || 'Information about the geology of this body is being compiled.'}</p>
          </div>
        );
      case 'moons':
        return (
          <div className="tab-content">
            <h3>Moons</h3>
            {body.moons && body.moons.length > 0 ? (
              <ul>
                {body.moons.map((moon, index) => (
                  <li key={index}>{moon}</li>
                ))}
              </ul>
            ) : (
              <p>This celestial body has no known moons.</p>
            )}
          </div>
        );
      case 'history':
        return (
          <div className="tab-content">
            <h3>Discovery & Exploration History</h3>
            <p>{body.history || 'Historical information is currently being updated.'}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleZoomInModel = () => {
    alert('Zoom In on model functionality is not implemented.');
  };

  const handleZoomOutModel = () => {
    alert('Zoom Out on model functionality is not implemented.');
  };

  const handleRotateModel = () => {
    alert('Rotate model functionality is not implemented.');
  };

  return (
    <div className="celestial-body-profile">
      <div className="detail-content">
        <div className="detail-left-panel">
          <div className="model-viewer-placeholder">
            3D Model of {body.name}
            <div className="model-viewer-controls">
              <button onClick={handleZoomInModel} className="button">
                <ZoomIn size={18} />
              </button>
              <button onClick={handleZoomOutModel} className="button">
                <ZoomOut size={18} />
              </button>
              <button onClick={handleRotateModel} className="button">
                <Rotate3D size={18} />
              </button>
            </div>
          </div>
          <div className="image-gallery">
            {body.images && body.images.length > 0 ? (
              body.images.map((img, index) => (
                <img key={index} src={img} alt={`${body.name} image ${index + 1}`} />
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
        </div>
        <div className="detail-right-panel">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-button ${activeTab === 'geology' ? 'active' : ''}`}
              onClick={() => setActiveTab('geology')}
            >
              Geology
            </button>
            <button
              className={`tab-button ${activeTab === 'moons' ? 'active' : ''}`}
              onClick={() => setActiveTab('moons')}
            >
              Moons
            </button>
            <button
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default CelestialBodyProfile;