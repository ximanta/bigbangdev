import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, Rocket, Settings } from 'lucide-react';

function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        aria-label="Home"
      >
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        aria-label="Favorites"
      >
        <Heart size={24} />
        <span>Favorites</span>
      </NavLink>
      <NavLink
        to="/missions"
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        aria-label="Missions"
      >
        <Rocket size={24} />
        <span>Missions</span>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        aria-label="Settings"
      >
        <Settings size={24} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}

export default NavBar;