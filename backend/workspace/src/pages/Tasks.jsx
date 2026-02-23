import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DatePicker';
import RadioGroup from '../components/RadioGroup';
import Alert from '../components/Alert';
import { tasks as initialTasks, myGardenPlants } from '../data/mockData';

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // For editing
  const [newTaskForm, setNewTaskForm] = useState({
    plantId: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    completed: false,
  });
  const [alert, setAlert] = useState(null);

  const plantOptions = myGardenPlants.map(p => ({ value: p.id, label: p.name }));
  const priorityOptions = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];

  const handleToggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTaskClick = () => {
    setCurrentTask(null);
    setNewTaskForm({
      plantId: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      completed: false,
    });
    setIsModalOpen(true);
  };

  const handleEditTaskClick = (task) => {
    setCurrentTask(task);
    setNewTaskForm({
      plantId: task.plantId,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: task.completed,
    });
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setAlert({ type: 'success', message: 'Task deleted successfully!' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTaskForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const plantName = myGardenPlants.find(p => p.id === newTaskForm.plantId)?.name || 'Unknown Plant';

    if (currentTask) {
      // Edit existing task
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === currentTask.id ? { ...newTaskForm, id: currentTask.id, plantName } : task
        )
      );
      setAlert({ type: 'success', message: 'Task updated successfully!' });
    } else {
      // Add new task
      const newId = `t${tasks.length + 1}`;
      setTasks(prevTasks => [
        ...prevTasks,
        { ...newTaskForm, id: newId, plantName }
      ]);
      setAlert({ type: 'success', message: 'Task added successfully!' });
    }
    handleModalClose();
    setTimeout(() => setAlert(null), 3000);
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="tasks-page">
      <h1>My Gardening Tasks</h1>
      <Button onClick={handleAddTaskClick} className="mb-20">Add New Task</Button>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        <Card title="Pending Tasks">
          {pendingTasks.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Complete</th>
                  <th>Plant</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingTasks.map(task => (
                  <tr key={task.id}>
                    <td>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        name={`complete-${task.id}`}
                      />
                    </td>
                    <td>{task.plantName}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.priority}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleEditTaskClick(task)}>Edit</Button>
                      <Button variant="secondary" onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending tasks! Your garden is in great shape.</p>
          )}
        </Card>

        <Card title="Completed Tasks">
          {completedTasks.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Complete</th>
                  <th>Plant</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map(task => (
                  <tr key={task.id} style={{ textDecoration: 'line-through', color: '#888' }}>
                    <td>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        name={`complete-${task.id}`}
                      />
                    </td>
                    <td>{task.plantName}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.priority}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No completed tasks yet.</p>
          )}
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={currentTask ? 'Edit Task' : 'Add New Task'}>
        <form onSubmit={handleSubmit}>
          <Dropdown
            label="Associated Plant"
            name="plantId"
            options={[{ value: '', label: 'Select a plant...' }, ...plantOptions]}
            value={newTaskForm.plantId}
            onChange={handleChange}
            required
          />
          <InputField
            label="Task Description"
            name="description"
            value={newTaskForm.description}
            onChange={handleChange}
            placeholder="e.g., Water tomato plants, Prune basil"
            required
          />
          <DatePicker
            label="Due Date"
            name="dueDate"
            value={newTaskForm.dueDate}
            onChange={handleChange}
            required
          />
          <RadioGroup
            label="Priority"
            name="priority"
            options={priorityOptions}
            selectedValue={newTaskForm.priority}
            onChange={handleChange}
          />
          {currentTask && (
            <Checkbox
              label="Mark as Completed"
              name="completed"
              checked={newTaskForm.completed}
              onChange={handleChange}
            />
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <Button type="button" variant="secondary" onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" variant="primary">{currentTask ? 'Update Task' : 'Add Task'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;