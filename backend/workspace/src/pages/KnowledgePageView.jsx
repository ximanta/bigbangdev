import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { celestialBodies } from '../data/celestialBodies';
import FactCard from '../components/FactCard';
import LoadingSpinner from '../components/LoadingSpinner';

const KnowledgePageView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundBody = celestialBodies.find(b => b.id === id);
    if (foundBody) {
      setBody(foundBody);
    } else {
      // Redirect to home or 404 if body not found
      navigate('/');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading || !body) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div
      className="knowledge-page-view"
    >
      <div
        className="knowledge-page-header"
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
          className="knowledge-page-title"
        >
          {body.name}
        </h1>
      </div>

      <div
        className="image-gallery"
      >
        {body.imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${body.name} image ${index + 1}`}
          />
        ))}
      </div>

      <div
        className="card content-section"
      >
        <h2>
          Overview
        </h2>
        <p>
          {body.description}
        </p>
      </div>

      <div
        className="fact-cards-grid"
      >
        {body.facts.map((fact, index) => (
          <FactCard
            key={index}
            label={fact.label}
            value={fact.value}
          />
        ))}
      </div>
    </div>
  );
};

export default KnowledgePageView;
