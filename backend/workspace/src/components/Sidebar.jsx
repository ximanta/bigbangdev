import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PawPrint, Calendar, HeartPulse, Settings } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypets"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <PawPrint size={18} />
              My Pets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/schedule"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Calendar size={18} />
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/health"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <HeartPulse size={18} />
              Health
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Settings size={18} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
