import React from 'react';

function FilterButtons({
  currentFilter,
  onFilterChange,
}) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="filter-buttons-container">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`btn ${currentFilter === filter ? 'active' : ''}`}
          aria-pressed={currentFilter === filter}
          aria-label={`Show ${filter} tasks`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
