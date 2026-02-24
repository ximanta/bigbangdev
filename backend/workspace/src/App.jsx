import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlanetDetailPage from './pages/PlanetDetailPage';
import MoonDetailPage from './pages/MoonDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/planets/:planetId"
          element={<PlanetDetailPage />}
        />
        <Route
          path="/moons/:moonId"
          element={<MoonDetailPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;