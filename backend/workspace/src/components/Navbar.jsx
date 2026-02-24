import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function Navbar({ title, showBack = false }) {
  return (
    <nav className="navbar">
      {
        showBack && (
          <Link
            to="/"
            className="navbar-back-button"
          >
            <ChevronLeft size={24} />
          </Link>
        )
      }
      <h1 className="navbar-title">
        {title}
      </h1>
    </nav>
  );
}

export default Navbar;