import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PlanetCard from '../components/PlanetCard';
import { solarSystemData } from '../data/solarSystemData';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlanets = solarSystemData.planets.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <Navbar title="Solar System Knowledge Book" />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search planets..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="planet-grid">
        {
          filteredPlanets.map(planet => (
            <PlanetCard
              key={planet.id}
              planet={planet}
            />
          ))
        }
      </div>
    </div>
  );
}

export default HomePage;