import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <Navbar
        title="Page Not Found"
        showBack={false}
      />
      <h1>
        404
      </h1>
      <p>
        Oops! The page you're looking for does not exist.
      </p>
      <Link to="/">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;