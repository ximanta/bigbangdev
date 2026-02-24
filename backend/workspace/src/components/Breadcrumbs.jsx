import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumbs">
      <Link to="/dashboard">Dashboard</Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const displayName = value
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return last ? (
          <span key={to}> / {displayName}</span>
        ) : (
          <span key={to}>
            {' '}/
            <Link to={to}>{displayName}</Link>
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
