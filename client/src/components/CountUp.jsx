import React, { useState, useEffect } from 'react';
import './CountUp.css';

const CountUp = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [dayOfYear, setDayOfYear] = useState(0);
  const [dayOfMonth, setDayOfMonth] = useState(0); // New state for day of the month

  useEffect(() => {
    const date = new Date();

    // Format date to DD-MM-YYYY
    const formattedDate = date.toISOString().split('T')[0];
    setCurrentDate(formattedDate.split('-').reverse().join('-'));

    // Calculate day of the year
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    setDayOfYear(day);

    // Get day of the month
    setDayOfMonth(date.getDate());
  }, []);

  return (
    <div id='countUpBox'>
      <p>Current Date: {currentDate}</p>
      <p>Day of the Year: {dayOfYear}</p>
      <p>Day of the Month: {dayOfMonth}</p> {/* Displaying day of the month */}
    </div>
  );
};

export default CountUp;
