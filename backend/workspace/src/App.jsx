import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import MissionsPage from './pages/MissionsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <NavBar />
    </div>
  );
}

export default App;