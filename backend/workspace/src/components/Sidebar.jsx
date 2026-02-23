import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sprout, Leaf, Calendar, ListTodo, BookOpen } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/my-garden" className={({ isActive }) => isActive ? 'active' : ''}>
          <Sprout size={20} /> My Garden
        </NavLink>
        <NavLink to="/plant-database" className={({ isActive }) => isActive ? 'active' : ''}>
          <Leaf size={20} /> Plant Database
        </NavLink>
        <NavLink to="/planner" className={({ isActive }) => isActive ? 'active' : ''}>
          <Calendar size={20} /> Planner
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
          <ListTodo size={20} /> Tasks
        </NavLink>
        <NavLink to="/resources" className={({ isActive }) => isActive ? 'active' : ''}>
          <BookOpen size={20} /> Resources
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;