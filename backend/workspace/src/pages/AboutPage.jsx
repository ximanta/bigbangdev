import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="general-page"
    >
      <div
        className="general-page-header"
      >
        <button
          onClick={() => navigate(-1)}
          className="icon-button"
          aria-label="Go back"
        >
          <ArrowLeft
            size={24}
          />
        </button>
        <h1
          className="general-page-title"
        >
          About Solar System Explorer
        </h1>
      </div>

      <div
        className="general-page-content"
      >
        <p>
          Version: 1.0.0
        </p>
        <p>
          Developer: AI Assistant
        </p>
        <p>
          Data Sources: NASA, ESA, various astronomical databases.
        </p>
        <p>
          This app is designed to provide an interactive and educational
          experience of our solar system.
        </p>
        <p>
          &copy; 2023 Solar System Explorer.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
