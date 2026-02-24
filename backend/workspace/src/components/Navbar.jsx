import { NavLink } from 'react-router-dom';
import {
  Globe,
  Moon,
  Asterisk,
  CircleDot,
  Info
} from 'lucide-react';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/planets"
        className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
      >
        <Globe />
        <span>Planets</span>
      </NavLink>
      <NavLink
        to="/moons"
        className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
      >
        <Moon />
        <span>Moons</span>
      </NavLink>
      <NavLink
        to="/dwarf-planets"
        className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
      >
        <Asterisk />
        <span>Dwarf Planets</span>
      </NavLink>
      <NavLink
        to="/model"
        className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
      >
        <CircleDot />
        <span>Model</span>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
      >
        <Info />
        <span>About</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
