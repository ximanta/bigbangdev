import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DatePicker';
import ImageUpload from '../components/ImageUpload';
import ProgressBar from '../components/ProgressBar';
import { myGardenPlants, plants } from '../data/mockData';

const MyGarden = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlant, setNewPlant] = useState({
    plantId: '',
    name: '',
    plantedDate: '',
    notes: '',
    imageUrl: ''
  });

  const handleAddPlantClick = () => {
    setIsModalOpen(true);
    setNewPlant({ plantId: '', name: '', plantedDate: '', notes: '', imageUrl: '' });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'plantId') {
      const selectedPlant = plants.find(p => p.id === value);
      setNewPlant(prev => ({ ...prev, plantId: value, name: selectedPlant ? selectedPlant.name : '', imageUrl: selectedPlant ? selectedPlant.imageUrl : '' }));
    } else {
      setNewPlant(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileSelect = (file) => {
    // In a real app, you'd upload this file and get a URL
    // For demo, we'll just log it or use a placeholder
    console.log('File selected:', file.name);
    setNewPlant(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New plant added:', newPlant);
    // Add logic to save the new plant to your state/data source
    myGardenPlants.push({ ...newPlant, id: `mg${myGardenPlants.length + 1}`, status: 'New', progress: 0 }); // Mock add
    handleModalClose();
  };

  const plantOptions = plants.map(p => ({ value: p.id, label: p.name }));

  return (
    <div className="my-garden-page">
      <h1>My Garden</h1>
      <Button onClick={handleAddPlantClick} className="mb-20">Add New Plant</Button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {myGardenPlants.map(plant => (
          <Card key={plant.id} title={plant.name}>
            <img src={plant.imageUrl} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
            <p><strong>Type:</strong> {plant.type}</p>
            <p><strong>Planted:</strong> {plant.plantedDate}</p>
            <p><strong>Status:</strong> {plant.status}</p>
            <p><strong>Notes:</strong> {plant.notes}</p>
            <ProgressBar progress={plant.progress} label={`${plant.progress}% Growth`} />
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <Button variant="secondary" onClick={() => console.log('Edit', plant.id)}>Edit</Button>
              <Button variant="secondary" onClick={() => console.log('Delete', plant.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Add New Plant to My Garden">
        <form onSubmit={handleSubmit}>
          <Dropdown
            label="Select Plant Type"
            name="plantId"
            options={[{ value: '', label: 'Select a plant...' }, ...plantOptions]}
            value={newPlant.plantId}
            onChange={handleChange}
            required
          />
          <InputField
            label="Custom Plant Name (Optional)"
            name="name"
            value={newPlant.name}
            onChange={handleChange}
            placeholder="e.g., My Big Tomato Plant"
          />
          <DatePicker
            label="Planted Date"
            name="plantedDate"
            value={newPlant.plantedDate}
            onChange={handleChange}
            required
          />
          <InputField
            label="Notes"
            name="notes"
            value={newPlant.notes}
            onChange={handleChange}
            isMultiLine
            placeholder="Any specific observations or care instructions..."
          />
          <ImageUpload label="Upload Plant Photo" onFileSelect={handleFileSelect} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <Button type="button" variant="secondary" onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" variant="primary">Add Plant</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyGarden;