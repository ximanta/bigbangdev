import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import DataTable from '../components/ui/DataTable';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import DatePicker from '../components/ui/DatePicker';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { pets as initialPets } from '../data/mockData';

function Health() {
  const [selectedPetId, setSelectedPetId] = useState('');
  const [pets, setPets] = useState(initialPets);
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [formMedicalEntry, setFormMedicalEntry] = useState({
    date: '',
    type: '',
    description: ''
  });
  const [formMedicationEntry, setFormMedicationEntry] = useState({
    name: '',
    dosage: '',
    lastGiven: ''
  });

  const petOptions = pets.map((pet) => ({ value: pet.id, label: pet.name }));

  React.useEffect(() => {
    if (petOptions.length > 0 && !selectedPetId) {
      setSelectedPetId(petOptions[0].value);
    }
  }, [pets, petOptions, selectedPetId]);

  const selectedPet = pets.find((p) => p.id === selectedPetId);

  const handleMedicalFormChange = (e) => {
    const { id, value } = e.target;
    setFormMedicalEntry((prev) => ({ ...prev, [id]: value }));
  };

  const handleMedicationFormChange = (e) => {
    const { id, value } = e.target;
    setFormMedicationEntry((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddMedicalEntry = (e) => {
    e.preventDefault();
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === selectedPetId
          ? { ...pet, medicalHistory: [...(pet.medicalHistory || []), formMedicalEntry] }
          : pet
      )
    );
    setIsMedicalModalOpen(false);
    setFormMedicalEntry({ date: '', type: '', description: '' });
  };

  const handleAddMedicationEntry = (e) => {
    e.preventDefault();
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === selectedPetId
          ? { ...pet, medications: [...(pet.medications || []), formMedicationEntry] }
          : pet
      )
    );
    setIsMedicationModalOpen(false);
    setFormMedicationEntry({ name: '', dosage: '', lastGiven: '' });
  };

  const medicalHistoryColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Type', accessor: 'type' },
    { header: 'Description', accessor: 'description' }
  ];

  const medicationsColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Dosage', accessor: 'dosage' },
    { header: 'Last Given', accessor: 'lastGiven' }
  ];

  return (
    <div className="container">
      <Breadcrumbs />
      <h1>Health Records</h1>

      <div className="form-group mb-4">
        <label htmlFor="selectPet">Select Pet:</label>
        <Select
          id="selectPet"
          value={selectedPetId}
          onChange={(e) => setSelectedPetId(e.target.value)}
          options={petOptions}
        />
      </div>

      {selectedPet ? (
        <>
          <section className="card p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2>Medical History for {selectedPet.name}</h2>
              <Button onClick={() => setIsMedicalModalOpen(true)} variant="primary">
                Add Medical Entry
              </Button>
            </div>
            {selectedPet.medicalHistory && selectedPet.medicalHistory.length > 0 ? (
              <DataTable columns={medicalHistoryColumns} data={selectedPet.medicalHistory} />
            ) : (
              <p>No medical history recorded for {selectedPet.name}.</p>
            )}
          </section>

          <section className="card p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2>Medications for {selectedPet.name}</h2>
              <Button onClick={() => setIsMedicationModalOpen(true)} variant="primary">
                Add Medication
              </Button>
            </div>
            {selectedPet.medications && selectedPet.medications.length > 0 ? (
              <DataTable columns={medicationsColumns} data={selectedPet.medications} />
            ) : (
              <p>No medications recorded for {selectedPet.name}.</p>
            )}
          </section>
        </>
      ) : (
        <p>Please add a pet to view health records.</p>
      )}

      {/* Add Medical Entry Modal */}
      <Modal
        isOpen={isMedicalModalOpen}
        onClose={() => setIsMedicalModalOpen(false)}
        title="Add Medical History Entry"
      >
        <form onSubmit={handleAddMedicalEntry} className="p-2">
          <DatePicker
            label="Date"
            id="date"
            value={formMedicalEntry.date}
            onChange={handleMedicalFormChange}
            required
          />
          <Input
            label="Type (e.g., Vaccination, Check-up)"
            id="type"
            value={formMedicalEntry.type}
            onChange={handleMedicalFormChange}
            required
          />
          <Textarea
            label="Description"
            id="description"
            value={formMedicalEntry.description}
            onChange={handleMedicalFormChange}
            rows={3}
            required
          />
          <div className="flex justify-end mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsMedicalModalOpen(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Entry
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Medication Modal */}
      <Modal
        isOpen={isMedicationModalOpen}
        onClose={() => setIsMedicationModalOpen(false)}
        title="Add New Medication"
      >
        <form onSubmit={handleAddMedicationEntry} className="p-2">
          <Input
            label="Medication Name"
            id="name"
            value={formMedicationEntry.name}
            onChange={handleMedicationFormChange}
            required
          />
          <Input
            label="Dosage / Frequency (e.g., 5mg daily, Monthly)"
            id="dosage"
            value={formMedicationEntry.dosage}
            onChange={handleMedicationFormChange}
            required
          />
          <DatePicker
            label="Last Given Date"
            id="lastGiven"
            value={formMedicationEntry.lastGiven}
            onChange={handleMedicationFormChange}
          />
          <div className="flex justify-end mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsMedicationModalOpen(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Medication
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Health;
