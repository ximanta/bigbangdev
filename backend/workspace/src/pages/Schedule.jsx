import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CalendarView from '../components/ui/CalendarView';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import DatePicker from '../components/ui/DatePicker';
import TimePicker from '../components/ui/TimePicker';
import Textarea from '../components/ui/Textarea';
import Checkbox from '../components/ui/Checkbox';
import { pets, activities as initialActivities } from '../data/mockData';

function Schedule() {
  const [allActivities, setAllActivities] = useState(initialActivities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [formActivity, setFormActivity] = useState({
    petId: '',
    type: 'Walk',
    date: '',
    time: '',
    description: '',
    completed: false
  });

  const activityTypeOptions = [
    { value: 'Walk', label: 'Walk' },
    { value: 'Feeding', label: 'Feeding' },
    { value: 'Medication', label: 'Medication' },
    { value: 'Grooming', label: 'Grooming' },
    { value: 'Vet Appointment', label: 'Vet Appointment' },
    { value: 'Training', label: 'Training' },
    { value: 'Other', label: 'Other' }
  ];

  const petOptions = pets.map((pet) => ({ value: pet.id, label: pet.name }));
  const defaultPetId = petOptions.length > 0 ? petOptions[0].value : '';

  const openAddModal = () => {
    setEditingActivity(null);
    setFormActivity({
      petId: defaultPetId,
      type: 'Walk',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      description: '',
      completed: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (activity) => {
    setEditingActivity(activity);
    setFormActivity({ ...activity });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormActivity((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingActivity) {
      setAllActivities((prev) =>
        prev.map((act) => (act.id === editingActivity.id ? { ...formActivity, id: act.id } : act))
      );
    } else {
      const newId = (Math.max(...allActivities.map(a => parseInt(a.id.replace('a', ''))) || [0]) + 1).toString();
      setAllActivities((prev) => [...prev, { ...formActivity, id: `a${newId}` }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setAllActivities((prev) => prev.filter((act) => act.id !== id));
    }
  };

  const upcomingActivities = allActivities
    .filter((activity) => !activity.completed)
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  const activityColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Time', accessor: 'time' },
    { header: 'Pet', render: (row) => pets.find(p => p.id === row.petId)?.name || 'N/A' },
    { header: 'Type', accessor: 'type' },
    { header: 'Description', accessor: 'description' },
    { header: 'Completed', render: (row) => (row.completed ? 'Yes' : 'No') },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex">
          <Button onClick={() => openEditModal(row)} variant="secondary" className="mr-2">
            Edit
          </Button>
          <Button onClick={() => handleDelete(row.id)} variant="danger">
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="container">
      <Breadcrumbs />
      <div className="flex justify-between items-center mb-4">
        <h1>Schedule</h1>
        <Button onClick={openAddModal} variant="primary">
          Add New Activity
        </Button>
      </div>

      <section className="mb-4">
        <h2>Calendar View</h2>
        <CalendarView events={allActivities} />
      </section>

      <section className="mb-4">
        <h2>Upcoming Activities</h2>
        {upcomingActivities.length > 0 ? (
          <DataTable columns={activityColumns} data={upcomingActivities} />
        ) : (
          <p>No upcoming activities.</p>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingActivity ? 'Edit Activity' : 'Add New Activity'}
      >
        <form onSubmit={handleSubmit} className="p-2">
          <Select
            label="Pet"
            id="petId"
            value={formActivity.petId}
            onChange={handleFormChange}
            options={petOptions}
            required
          />
          <Select
            label="Activity Type"
            id="type"
            value={formActivity.type}
            onChange={handleFormChange}
            options={activityTypeOptions}
            required
          />
          <DatePicker
            label="Date"
            id="date"
            value={formActivity.date}
            onChange={handleFormChange}
            required
          />
          <TimePicker
            label="Time"
            id="time"
            value={formActivity.time}
            onChange={handleFormChange}
            required
          />
          <Textarea
            label="Description"
            id="description"
            value={formActivity.description}
            onChange={handleFormChange}
            rows={3}
          />
          <Checkbox
            label="Completed"
            id="completed"
            checked={formActivity.completed}
            onChange={handleFormChange}
          />
          <div className="flex justify-end mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingActivity ? 'Update Activity' : 'Add Activity'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Schedule;
