import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useStellarNavigator } from '../context/StellarNavigatorContext.jsx';
import celestialBodiesData from '../data/celestialBodies.js';

function SearchBar({ onClose }) {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedBodyId
  } = useStellarNavigator();
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchBarRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = celestialBodiesData.filter(body =>
        body.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
      setSelectedIndex(-1); // Reset selection when results change
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectResult = (bodyId) => {
    setSelectedBodyId(bodyId);
    setSearchQuery('');
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex(prevIndex =>
        (prevIndex + 1) % filteredResults.length
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex(prevIndex =>
        (prevIndex - 1 + filteredResults.length) % filteredResults.length
      );
    } else if (event.key === 'Enter' && selectedIndex !== -1) {
      event.preventDefault();
      handleSelectResult(filteredResults[selectedIndex].id);
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="search-bar-container"
      ref={searchBarRef}
    >
      <div className="search-input-wrapper">
        <Search size={20} style={{ margin: '0 10px' }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for celestial bodies..."
          className="input-field"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Search for celestial bodies"
        />
        <button
          onClick={onClose}
          className="header-action-button"
          aria-label="Close search bar"
        >
          <X size={20} />
        </button>
      </div>

      {filteredResults.length > 0 && (
        <ul className="search-results">
          {filteredResults.map((body, index) => (
            <li
              key={body.id}
              className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelectResult(body.id)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
              tabIndex="0"
            >
              {body.name} ({body.type})
            </li>
          ))}
        </ul>
      )}
      {searchQuery.length > 1 && filteredResults.length === 0 && (
        <div className="search-results">
          <p className="search-result-item">
            No results found for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;