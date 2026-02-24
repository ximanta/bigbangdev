import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import PetForm from '../components/forms/PetForm';
import { pets as initialPets } from '../data/mockData';

function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allPets, setAllPets] = useState(initialPets);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const pet = allPets.find((p) => p.id === id);

  if (!pet) {
    return (
      <div className="container">
        <Breadcrumbs />
        <h1>Pet Not Found</h1>
        <p>The pet you are looking for does not exist.</p>
        <Button onClick={() => navigate('/mypets')} variant="primary">
          Back to My Pets
        </Button>
      </div>
    );
  }

  const handleUpdatePet = (updatedPetData) => {
    setAllPets((prev) =>
      prev.map((p) => (p.id === id ? { ...updatedPetData, id: id } : p))
    );
    setIsEditModalOpen(false);
  };

  const handleDeletePet = () => {
    if (window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      setAllPets((prev) => prev.filter((p) => p.id !== id));
      navigate('/mypets');
    }
  };

  const medicalColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Type', accessor: 'type' },
    { header: 'Description', accessor: 'description' }
  ];

  const medicationColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Dosage', accessor: 'dosage' },
    { header: 'Last Given', accessor: 'lastGiven' }
  ];

  return (
    <div className="container">
      <Breadcrumbs />
      <div className="flex justify-between items-center mb-4">
        <h1>{pet.name}'s Profile</h1>
        <div>
          <Button onClick={() => setIsEditModalOpen(true)} variant="secondary" className="mr-2">
            Edit Profile
          </Button>
          <Button onClick={handleDeletePet} variant="danger">
            Delete Pet
          </Button>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex items-center mb-3">
          <img src={pet.photo} alt={pet.name} className="pet-card-avatar" style={{ width: '120px', height: '120px' }} />
          <div className="ml-4">
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age} years old</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Spayed/Neutered:</strong> {pet.spayedNeutered ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <Textarea
          label="Notes/Behavior"
          id="petNotes"
          value={pet.notes}
          readOnly
          rows={4}
        />
      </div>

      <section className="card p-4 mb-4">
        <h2>Medical History</h2>
        {pet.medicalHistory && pet.medicalHistory.length > 0 ? (
          <DataTable columns={medicalColumns} data={pet.medicalHistory} />
        ) : (
          <p>No medical history recorded.</p>
        )}
      </section>

      <section className="card p-4 mb-4">
        <h2>Medications</h2>
        {pet.medications && pet.medications.length > 0 ? (
          <DataTable columns={medicationColumns} data={pet.medications} />
        ) : (
          <p>No medications recorded.</p>
        )}
      </section>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${pet.name}'s Profile`}
      >
        <PetForm
          initialData={{ ...pet, id: pet.id }}
          onSubmit={handleUpdatePet}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default PetDetail;
