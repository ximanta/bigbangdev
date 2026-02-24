import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Search, Settings } from 'lucide-react';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  const handleSettingsClick = () => {
    alert('Settings functionality is not implemented yet.');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="app-logo">
          <Globe size={28} />
          Cosmic Guide
        </Link>
        <div className="search-bar">
          <Search size={18} className="icon" />
          <input
            type="text"
            placeholder="Search celestial bodies..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <button onClick={handleSettingsClick} className="button">
        <Settings size={20} />
        Settings
      </button>
    </header>
  );
}

export default Header;