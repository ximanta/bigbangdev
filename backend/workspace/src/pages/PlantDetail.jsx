import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { plants } from '../data/mockData';

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return <p>Plant not found.</p>;
  }

  return (
    <div className="plant-detail-page">
      <Button onClick={() => navigate(-1)} variant="secondary" style={{ marginBottom: '20px' }}>&larr; Back to Database</Button>
      <h1>{plant.name}</h1>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <img src={plant.imageUrl} alt={plant.name} style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
        </div>
        <div style={{ flex: '2 1 400px' }}>
          <Card title="Overview">
            <p><strong>Type:</strong> {plant.type}</p>
            <p><strong>Description:</strong> {plant.description}</p>
            <p><strong>USDA Zone:</strong> {plant.zone}</p>
          </Card>

          <Card title="Care Instructions" style={{ marginTop: '20px' }}>
            <p><strong>Sunlight:</strong> {plant.sunlight}</p>
            <p><strong>Soil:</strong> {plant.soil}</p>
            <p><strong>Watering:</strong> {plant.watering}</p>
            <p><strong>Pruning:</strong> {plant.pruning}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;