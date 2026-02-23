import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would navigate to a search results page
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">MyGreenThumb</Link>
      <nav className="header-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-garden">My Garden</Link>
        <Link to="/plant-database">Plants</Link>
        <Link to="/tasks">Tasks</Link>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <form onSubmit={handleSearch} className="header-search">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn-icon search-icon">
            <Search size={18} />
          </button>
        </form>
        <div className="user-profile">
          <button><User size={20} /> Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;