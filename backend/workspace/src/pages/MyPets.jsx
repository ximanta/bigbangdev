import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import PetCard from '../components/ui/PetCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import PetForm from '../components/forms/PetForm';
import { pets as initialPets } from '../data/mockData';

function MyPets() {
  const [allPets, setAllPets] = useState(initialPets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const handleAddPet = (newPetData) => {
    const newId = (Math.max(...allPets.map(p => parseInt(p.id))) + 1).toString();
    setAllPets((prev) => [...prev, { ...newPetData, id: newId }]);
    setIsModalOpen(false);
  };

  const handleEditPet = (updatedPetData) => {
    setAllPets((prev) =>
      prev.map((pet) => (pet.id === updatedPetData.id ? updatedPetData : pet))
    );
    setEditingPet(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setEditingPet(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Breadcrumbs />
      <div className="flex justify-between items-center mb-4">
        <h1>My Pets</h1>
        <Button onClick={openAddModal} variant="primary">
          Add New Pet
        </Button>
      </div>

      <section>
        <div className="grid grid-cols-2 gap-4">
          {allPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
        {allPets.length === 0 && (
          <p className="text-center">No pets added yet. Click 'Add New Pet' to get started!</p>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPet ? 'Edit Pet' : 'Add New Pet'}
      >
        <PetForm
          initialData={editingPet || {}}
          onSubmit={editingPet ? handleEditPet : handleAddPet}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default MyPets;
