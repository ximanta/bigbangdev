import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ImageCarousel({ images, altText }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel">
        <img
          src="/images/placeholder.jpg"
          alt="No image available"
          className="carousel-image"
        />
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-carousel">
      <img
        src={images[currentIndex]}
        alt={`${altText} image ${currentIndex + 1}`}
        className="carousel-image"
      />
      {images.length > 1 && (
        <button
          onClick={goToPrevious}
          className="carousel-nav-button left"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="carousel-nav-button right"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

export default ImageCarousel;
