import React, { useState } from 'react';
import Card from '../components/Card';
import DatePicker from '../components/DatePicker';
import Button from '../components/Button';

const Planner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [gardenLayout, setGardenLayout] = useState(Array(5).fill(Array(5).fill(null))); // Mock 5x5 grid

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleGridClick = (rowIndex, colIndex) => {
    // In a real app, this would open a modal to select a plant to place
    console.log(`Clicked on grid cell: (${rowIndex}, ${colIndex})`);
    const newLayout = gardenLayout.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return cell ? null : '🌱'; // Toggle plant symbol for demo
        }
        return cell;
      })
    );
    setGardenLayout(newLayout);
  };

  return (
    <div className="planner-page">
      <h1>Garden Planner</h1>
      <p>Visually map out your garden beds and plan planting schedules.</p>

      <Card title="Calendar & Schedule" style={{ marginBottom: '30px' }}>
        <DatePicker label="View Schedule For" value={selectedDate} onChange={handleDateChange} />
        <p style={{ marginTop: '15px' }}>Tasks for <strong>{selectedDate}</strong>: (No tasks implemented for this date in mock)</p>
        {/* Placeholder for calendar/schedule display */}
      </Card>

      <Card title="Garden Layout" style={{ marginBottom: '30px' }}>
        <p>Click on a cell to place/remove a mock plant.</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gardenLayout[0].length}, 80px)`,
          gridTemplateRows: `repeat(${gardenLayout.length}, 80px)`,
          gap: '5px',
          border: '1px solid var(--border-color)',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9'
        }}>
          {gardenLayout.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: '80px',
                  height: '80px',
                  border: '1px dashed #ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2em',
                  backgroundColor: cell ? 'rgba(76, 175, 80, 0.1)' : 'white',
                  cursor: 'pointer'
                }}
                onClick={() => handleGridClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>
        <Button style={{ marginTop: '20px' }} onClick={() => alert('Save layout functionality would go here!')}>Save Layout</Button>
      </Card>

      {/* Future: Planting suggestions based on layout and date */}
    </div>
  );
};

export default Planner;