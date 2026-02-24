import React, { useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import EmptyState from './components/EmptyState';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const addTask = (title) => {
    if (title.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTaskTitle = (id, newTitle) => {
    if (newTitle.trim()) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: newTitle.trim() } : task
        )
      );
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="app-container">
      <Header />

      <TaskInput onAddTask={addTask} />

      <FilterButtons
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      {filteredTasks.length === 0 && (
        <EmptyState filter={filter} />
      )}

      {filteredTasks.length > 0 && (
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleTaskCompletion}
          onEdit={editTaskTitle}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
