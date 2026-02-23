import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStellarNavigator } from '../context/StellarNavigatorContext.jsx';
import celestialBodiesData from '../data/celestialBodies.js';
import { Eye, Heart } from 'lucide-react';

function FavoritesPage() {
  const {
    favorites,
    toggleFavorite,
    setSelectedBodyId
  } = useStellarNavigator();
  const navigate = useNavigate();

  const favoriteBodies = celestialBodiesData.filter(body =>
    favorites.includes(body.id)
  );

  const handleViewDetails = (bodyId) => {
    setSelectedBodyId(bodyId);
    navigate('/');
  };

  const handleRemoveFavorite = (bodyId) => {
    toggleFavorite(bodyId);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        My Favorites
      </h1>
      {favoriteBodies.length === 0 ? (
        <p className="text-center">
          You haven't added any favorites yet. Explore the universe and add some!
        </p>
      ) : (
        <ul className="favorites-list">
          {favoriteBodies.map(body => (
            <li
              key={body.id}
              className="favorite-item"
            >
              <img
                src={body.imageUrl || 'https://via.placeholder.com/50'}
                alt={body.name}
                className="favorite-item-image"
              />
              <div className="favorite-item-details">
                <div className="favorite-item-name">
                  {body.name}
                </div>
                <div className="favorite-item-type">
                  {body.type}
                </div>
              </div>
              <div className="favorite-item-actions">
                <button
                  className="button"
                  onClick={() => handleViewDetails(body.id)}
                  aria-label={`View details for ${body.name}`}
                >
                  <Eye size={16} />
                </button>
                <button
                  className="button primary"
                  onClick={() => handleRemoveFavorite(body.id)}
                  aria-label={`Remove ${body.name} from favorites`}
                >
                  <Heart
                    size={16}
                    fill="currentColor"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;