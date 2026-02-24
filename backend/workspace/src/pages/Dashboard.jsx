import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { pets, activities } from '../data/mockData';
import PetCard from '../components/ui/PetCard';
import DataTable from '../components/ui/DataTable';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function Dashboard() {
  const upcomingActivities = activities
    .filter((activity) => !activity.completed && new Date(activity.date) >= new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)) // Sort by date and time
    .slice(0, 5); // Show top 5 upcoming

  const activityColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Time', accessor: 'time' },
    { header: 'Pet', render: (row) => pets.find(p => p.id === row.petId)?.name || 'N/A' },
    { header: 'Type', accessor: 'type' },
    { header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="container">
      <Breadcrumbs />
      <h1>Dashboard</h1>

      <section className="mb-4">
        <h2>My Pets</h2>
        <div className="grid grid-cols-2 gap-4">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
        <div className="mt-3">
          <Link to="/mypets">
            <Button variant="secondary">Manage All Pets</Button>
          </Link>
        </div>
      </section>

      <section className="mb-4">
        <h2>Upcoming Activities</h2>
        {upcomingActivities.length > 0 ? (
          <DataTable columns={activityColumns} data={upcomingActivities} />
        ) : (
          <p>No upcoming activities.</p>
        )}
        <div className="mt-3">
          <Link to="/schedule">
            <Button variant="secondary">View Full Schedule</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
