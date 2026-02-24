import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SolarSystemView from '../components/SolarSystemView';
import { solarSystemBodies } from '../data/solarSystemData';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBodies = solarSystemBodies.filter(body =>
    body.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <div className="home-page">
        <aside className="sidebar">
          <h2>Celestial Bodies</h2>
          <ul className="celestial-list">
            {filteredBodies.map(body => (
              <li key={body.id} className="celestial-list-item">
                <Link to={`/body/${body.id}`} className="link">
                  {body.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="main-content">
          <SolarSystemView />
        </main>
      </div>
    </>
  );
}

export default HomePage;