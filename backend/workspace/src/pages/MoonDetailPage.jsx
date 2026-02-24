import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FactCard from '../components/FactCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { getMoonById } from '../data/solarSystemData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function MoonDetailPage() {
  const { moonId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const moon = getMoonById(moonId);

  if (!moon) {
    return (
      <div className="detail-page">
        <Navbar
          title="Moon Not Found"
          showBack={true}
        />
        <ErrorMessage message="Moon data could not be loaded or found." />
      </div>
    );
  }

  const images = moon.images || [];

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
        title={moon.name}
        showBack={true}
      />

      <h1 className="detail-header">
        {moon.name}
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
              alt={`${moon.name} image ${currentImageIndex + 1}`}
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
        {moon.description}
      </p>

      <div className="fact-cards-grid">
        {
          Object.entries(moon.facts).map(([label, value]) => (
            <FactCard
              key={label}
              label={label}
              value={value}
            />
          ))
        }
      </div>
    </div>
  );
}

export default MoonDetailPage;