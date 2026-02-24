import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CelestialBodyList from './pages/CelestialBodyList';
import CelestialBodyDetail from './pages/CelestialBodyDetail';
import InteractiveModelPage from './pages/InteractiveModelPage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import SearchBar from './components/SearchBar';

function App() {
  const navigate = useNavigate();

  // Redirect root to /planets for a default view
  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/planets', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Solar System Explorer</h1>
        <SearchBar />
      </header>
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planets" element={<CelestialBodyList type="planet" title="Planets" />} />
          <Route path="/moons" element={<CelestialBodyList type="moon" title="Moons" />} />
          <Route path="/dwarf-planets" element={<CelestialBodyList type="dwarf_planet" title="Dwarf Planets" />} />
          <Route path="/star/:id" element={<CelestialBodyDetail />} />
          <Route path="/planet/:id" element={<CelestialBodyDetail />} />
          <Route path="/moon/:id" element={<CelestialBodyDetail />} />
          <Route path="/dwarf-planet/:id" element={<CelestialBodyDetail />} />
          <Route path="/model" element={<InteractiveModelPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  );
}

export default App;
