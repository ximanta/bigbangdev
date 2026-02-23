import React from 'react';
import { X, Heart } from 'lucide-react';
import { useStellarNavigator } from '../context/StellarNavigatorContext.jsx';

function InformationPanel() {
  const {
    selectedBody,
    setSelectedBodyId,
    toggleFavorite,
    isFavorite
  } = useStellarNavigator();

  if (!selectedBody) {
    return null;
  }

  const handleClose = () => {
    setSelectedBodyId(null);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(selectedBody.id);
  };

  const favoriteText = isFavorite(selectedBody.id) ? 'Remove from Favorites' : 'Add to Favorites';

  return (
    <div className={`information-panel ${selectedBody ? 'open' : ''}`}>
      <button
        onClick={handleClose}
        className="panel-close-button"
        aria-label="Close information panel"
      >
        <X size={24} />
      </button>
      <h2 className="panel-title">
        {selectedBody.name}
      </h2>
      <p className="panel-subtitle">
        {selectedBody.type}
      </p>

      {selectedBody.imageUrl && (
        <div className="panel-image-gallery">
          <img
            src={selectedBody.imageUrl}
            alt={selectedBody.name}
          />
          {/* Add more images here if available */}
        </div>
      )}

      {selectedBody.videoUrl ? (
        <div className="panel-video-player">
          <iframe
            width="100%"
            height="100%"
            src={selectedBody.videoUrl}
            title={`${selectedBody.name} Video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="panel-video-player">
          No video available for {selectedBody.name}
        </div>
      )}

      <p className="panel-description">
        {selectedBody.description}
      </p>

      {selectedBody.facts && selectedBody.facts.length > 0 && (
        <div>
          <h3>Quick Facts</h3>
          <ul className="panel-facts-list">
            {selectedBody.facts.map((fact, index) => (
              <li key={index}>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="panel-actions">
        <button
          onClick={handleToggleFavorite}
          className={`button ${isFavorite(selectedBody.id) ? 'primary' : ''}`}
        >
          <Heart
            size={16}
            style={{ marginRight: '5px' }}
            fill={isFavorite(selectedBody.id) ? 'currentColor' : 'none'}
          />
          {favoriteText}
        </button>
        <button className="button">
          Go To Orbit
        </button>
      </div>
    </div>
  );
}

export default InformationPanel;