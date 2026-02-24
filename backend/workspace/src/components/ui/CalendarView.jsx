import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarView({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // Fill in days from previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      month: month - 1,
      year: year,
      isCurrentMonth: false,
      events: []
    });
  }

  // Fill in days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayEvents = events.filter(event => event.date === dateString);
    calendarDays.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true,
      isToday: new Date().toDateString() === new Date(year, month, i).toDateString(),
      events: dayEvents
    });
  }

  // Fill in days for next month
  const remainingDays = 42 - calendarDays.length; // Ensure 6 rows for consistency
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      month: month + 1,
      year: year,
      isCurrentMonth: false,
      events: []
    });
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-3">
        <Button onClick={goToPreviousMonth} variant="secondary">
          <ChevronLeft size={18} />
        </Button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <Button onClick={goToNextMonth} variant="secondary">
          <ChevronRight size={18} />
        </Button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-header-day">
            {day}
          </div>
        ))}
        {calendarDays.map((dayData, index) => (
          <div
            key={index}
            className={`calendar-day ${dayData.isCurrentMonth ? 'current-month' : 'other-month'} ${dayData.isToday ? 'today' : ''}`}
          >
            <span className="calendar-day-number">{dayData.day}</span>
            {dayData.events.map((event) => (
              <div key={event.id} className="calendar-event">
                {event.time} {event.description}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
