import React from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { myGardenPlants, tasks } from '../data/mockData';

const Dashboard = () => {
  const upcomingTasks = tasks.filter(task => !task.completed).slice(0, 3);
  const totalPlants = myGardenPlants.length;
  const activePlants = myGardenPlants.filter(p => p.status === 'Growing' || p.status === 'Harvesting').length;

  return (
    <div className="dashboard-page">
      <h1>Welcome Back, Gardener!</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <Card title="My Garden Snapshot">
          <p>You have <strong>{totalPlants} plants</strong> in your garden.</p>
          <p>Currently <strong>{activePlants} plants</strong> are actively growing or being harvested.</p>
          <p>Keep up the great work!</p>
        </Card>

        <Card title="Upcoming Tasks">
          {upcomingTasks.length > 0 ? (
            <ul>
              {upcomingTasks.map(task => (
                <li key={task.id} style={{ marginBottom: '10px' }}>
                  <strong>{task.plantName}:</strong> {task.description} (Due: {task.dueDate})
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming tasks! Time to relax or add more plants!</p>
          )}
        </Card>
      </div>

      <h2>My Plants Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {myGardenPlants.map(plant => (
          <Card key={plant.id} title={plant.name}>
            <img src={plant.imageUrl} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
            <p><strong>Status:</strong> {plant.status}</p>
            <p><strong>Planted:</strong> {plant.plantedDate}</p>
            <ProgressBar progress={plant.progress} label={`${plant.progress}% Growth`} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;