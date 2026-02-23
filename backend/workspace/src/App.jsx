import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

// Page Components
import Dashboard from './pages/Dashboard';
import MyGarden from './pages/MyGarden';
import PlantDatabase from './pages/PlantDatabase';
import PlantDetail from './pages/PlantDetail';
import Planner from './pages/Planner';
import Tasks from './pages/Tasks';
import Resources from './pages/Resources';

const App = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-garden" element={<MyGarden />} />
            <Route path="/plant-database" element={<PlantDatabase />} />
            <Route path="/plant-database/:id" element={<PlantDetail />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/resources" element={<Resources />} />
            {/* Add a catch-all for 404 if desired */}
            <Route path="*" element={<h2>404: Page Not Found</h2>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;