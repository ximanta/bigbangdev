import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MoonCard from '../components/MoonCard';
import FactCard from '../components/FactCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { getPlanetById } from '../data/solarSystemData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PlanetDetailPage() {
  const { planetId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const planet = getPlanetById(planetId);

  if (!planet) {
    return (
      <div className="detail-page">
        <Navbar
          title="Planet Not Found"
          showBack={true}
        />
        <ErrorMessage message="Planet data could not be loaded or found." />
      </div>
    );
  }

  const images = planet.images || [];

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % images.length
    );
  };

  return (
    <div className="detail-page">
      <Navbar
        title={planet.name}
        showBack={true}
      />

      <h1 className="detail-header">
        {planet.name}
      </h1>

      {
        images.length > 0 && (
          <div className="detail-image-carousel">
            {
              images.length > 1 && (
                <button
                  onClick={goToPreviousImage}
                  className="carousel-nav-button left"
                >
                  <ChevronLeft />
                </button>
              )
            }
            <img
              src={images[currentImageIndex]}
              alt={`${planet.name} image ${currentImageIndex + 1}`}
            />
            {
              images.length > 1 && (
                <button
                  onClick={goToNextImage}
                  className="carousel-nav-button right"
                >
                  <ChevronRight />
                </button>
              )
            }
          </div>
        )
      }

      <p className="detail-description">
        {planet.description}
      </p>

      <div className="fact-cards-grid">
        {
          Object.entries(planet.facts).map(([label, value]) => (
            <FactCard
              key={label}
              label={label}
              value={value}
            />
          ))
        }
      </div>

      {
        planet.moons && planet.moons.length > 0 && (
          <div className="moons-section">
            <h2>
              Moons of {planet.name}
            </h2>
            <div className="moon-grid">
              {
                planet.moons.map(moon => (
                  <MoonCard
                    key={moon.id}
                    moon={moon}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
}

export default PlanetDetailPage;