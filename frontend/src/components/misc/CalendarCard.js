import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCard.css';

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Add any additional logic when the date changes
  };

  return (
    <div className="calendar-card">
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default CalendarCard;

