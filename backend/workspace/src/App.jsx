import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import SolarSystemView from './pages/SolarSystemView';
import KnowledgePageView from './pages/KnowledgePageView';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SolarSystemView />
        }
      />
      <Route
        path="/body/:id"
        element={
          <KnowledgePageView />
        }
      />
      <Route
        path="/settings"
        element={
          <SettingsPage />
        }
      />
      <Route
        path="/about"
        element={
          <AboutPage />
        }
      />
    </Routes>
  );
}

export default App;
