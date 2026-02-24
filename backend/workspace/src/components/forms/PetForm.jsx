import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import RadioGroup from '../ui/RadioGroup';
import Checkbox from '../ui/Checkbox';
import Textarea from '../ui/Textarea';
import FileUpload from '../ui/FileUpload';
import Button from '../ui/Button';

function PetForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    spayedNeutered: false,
    photo: '',
    notes: ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState('');

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'Dog',
        breed: initialData.breed || '',
        age: initialData.age || '',
        gender: initialData.gender || 'Male',
        spayedNeutered: initialData.spayedNeutered || false,
        photo: initialData.photo || '',
        notes: initialData.notes || ''
      });
      setPreviewPhoto(initialData.photo || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value
    }));
  };

  const handleFileChange = (file) => {
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    if (photoFile) {
      // In a real app, you'd upload photoFile to a server
      // For this demo, we'll just use the previewPhoto as the new photo URL
      dataToSubmit.photo = previewPhoto;
    }
    onSubmit(dataToSubmit);
  };

  const petTypeOptions = [
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
    { value: 'Bird', label: 'Bird' },
    { value: 'Fish', label: 'Fish' },
    { value: 'Other', label: 'Other' }
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <Input
        label="Pet Name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Select
        label="Pet Type"
        id="type"
        value={formData.type}
        onChange={handleChange}
        options={petTypeOptions}
        required
      />
      <Input
        label="Breed"
        id="breed"
        value={formData.breed}
        onChange={handleChange}
        required
      />
      <Input
        label="Age (years)"
        id="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <RadioGroup
        label="Gender"
        name="gender"
        options={genderOptions}
        selectedValue={formData.gender}
        onChange={handleRadioChange}
        required
      />
      <Checkbox
        label="Spayed/Neutered"
        id="spayedNeutered"
        checked={formData.spayedNeutered}
        onChange={handleChange}
      />
      <FileUpload
        label="Pet Photo"
        id="photoUpload"
        onFileChange={handleFileChange}
        accept="image/*"
      />
      {previewPhoto && (
        <div className="mb-3 text-center">
          <p>Current Photo:</p>
          <img src={previewPhoto} alt="Pet Preview" className="pet-card-avatar" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
      <Textarea
        label="Notes/Medical History"
        id="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={5}
      />
      <div className="flex justify-end mt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="mr-2">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Pet
        </Button>
      </div>
    </form>
  );
}

export default PetForm;
