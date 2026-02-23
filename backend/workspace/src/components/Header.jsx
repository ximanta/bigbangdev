import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings, X } from 'lucide-react';
import SearchBar from './SearchBar.jsx';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="header-title">
        Stellar Navigator
      </Link>
      <div className="header-actions">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="header-action-button"
          aria-label={isSearchOpen ? 'Close search' : 'Open search'}
        >
          {isSearchOpen ? <X size={20} /> : <Search size={20} />}
        </button>
        <Link
          to="/settings"
          className="header-action-button"
          aria-label="Settings"
        >
          <Settings size={20} />
        </Link>
      </div>
      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
}

export default Header;