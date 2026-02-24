import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

function NotFound() {
  return (
    <div className="not-found-container">
      <Frown size={80} color="var(--accent-color)" />
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="button primary">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;