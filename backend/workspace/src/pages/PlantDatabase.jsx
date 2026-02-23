import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Card from '../components/Card';
import { plants } from '../data/mockData';

const PlantDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="plant-database-page">
      <h1>Plant Database</h1>
      <InputField
        type="text"
        placeholder="Search plants by name or type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-20"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredPlants.map(plant => (
          <Card key={plant.id} title={plant.name}>
            <img src={plant.imageUrl} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
            <p><strong>Type:</strong> {plant.type}</p>
            <p><strong>Sunlight:</strong> {plant.sunlight}</p>
            <p><strong>Zone:</strong> {plant.zone}</p>
            <Link to={`/plant-database/${plant.id}`} style={{ display: 'block', marginTop: '15px' }}>View Details</Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlantDatabase;