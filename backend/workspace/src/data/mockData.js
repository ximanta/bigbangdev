// src/data/mockData.js

export const pets = [
  {
    id: '1',
    name: 'Buddy',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    spayedNeutered: true,
    photo: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Buddy',
    notes: 'Very friendly and loves to play fetch.',
    medicalHistory: [
      { date: '2023-01-15', type: 'Vaccination', description: 'Rabies vaccine' },
      { date: '2023-06-01', type: 'Check-up', description: 'Annual vet visit' }
    ],
    medications: [
      { name: 'Flea & Tick', dosage: 'Monthly', lastGiven: '2024-05-10' }
    ]
  },
  {
    id: '2',
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Siamese',
    age: 5,
    gender: 'Female',
    spayedNeutered: true,
    photo: 'https://via.placeholder.com/150/C0C0C0/FFFFFF?text=Whiskers',
    notes: 'Loves naps and chasing laser pointers.',
    medicalHistory: [
      { date: '2022-11-20', type: 'Vaccination', description: 'FVRCP vaccine' }
    ],
    medications: []
  },
  {
    id: '3',
    name: 'Rocky',
    type: 'Dog',
    breed: 'Bulldog',
    age: 1,
    gender: 'Male',
    spayedNeutered: false,
    photo: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=Rocky',
    notes: 'Energetic puppy, still in training.',
    medicalHistory: [],
    medications: []
  }
];

export const activities = [
  {
    id: 'a1',
    petId: '1',
    type: 'Walk',
    date: '2024-06-20',
    time: '08:00',
    description: 'Morning walk in the park',
    completed: true
  },
  {
    id: 'a2',
    petId: '1',
    type: 'Feeding',
    date: '2024-06-20',
    time: '08:30',
    description: 'Breakfast',
    completed: true
  },
  {
    id: 'a3',
    petId: '2',
    type: 'Feeding',
    date: '2024-06-20',
    time: '09:00',
    description: 'Cat breakfast',
    completed: true
  },
  {
    id: 'a4',
    petId: '1',
    type: 'Medication',
    date: '2024-06-20',
    time: '09:30',
    description: 'Flea & Tick medication',
    completed: false
  },
  {
    id: 'a5',
    petId: '3',
    type: 'Training',
    date: '2024-06-20',
    time: '10:00',
    description: 'Basic obedience training',
    completed: false
  },
  {
    id: 'a6',
    petId: '1',
    type: 'Vet Appointment',
    date: '2024-06-25',
    time: '14:00',
    description: 'Annual check-up for Buddy',
    completed: false
  },
  {
    id: 'a7',
    petId: '2',
    type: 'Grooming',
    date: '2024-06-28',
    time: '11:00',
    description: 'Cat bath and nail trim',
    completed: false
  }
];
