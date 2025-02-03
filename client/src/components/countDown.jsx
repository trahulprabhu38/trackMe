import React, { useState, useEffect } from 'react';
import CountUp from './countUp';
import MonthData from './monthData';

const CountDown = () => {
  const [startDate, setStartDate] = useState('');  // Start date initialized to today's date
  const [daysToAdd, setDaysToAdd] = useState(0);   // Number of days to add
  const [endDate, setEndDate] = useState('');      // Calculated end date
  const [daysLeft, setDaysLeft] = useState();

  // Set today's date as the default start date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
  }, []);

  // Function to add days to the start date
  const addDays = () => {
    if (!startDate || !daysToAdd) {
      alert('Please enter a valid number of days.');
      return;
    }

    const date = new Date(startDate);
    date.setDate(date.getDate() + parseInt(daysToAdd, 10));  // Add days

    const formattedEndDate = date.toISOString().split('T')[0];  // Format to YYYY-MM-DD
    const endRes = formattedEndDate.split('-').reverse().join('-');
    setEndDate(endRes);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Days to a Date</h2>

      <label>
        Start Date:
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </label>

      <br /><br />

      <label>
        Days to Add:
        <input 
          type="number" 
          value={daysToAdd} 
          onChange={(e) => setDaysToAdd(e.target.value)} 
        />
      </label>

      <br /><br />

      <button onClick={addDays}>Calculate End Date</button>

      {endDate && (
        <div style={{ marginTop: '20px' }}>
          <strong>End Date:</strong> {endDate}
        </div>
      )}

      <div>
        days left : {daysLeft} 
      </div>

      <hr />
      <CountUp />
      <hr />
      <MonthData />
    </div>
  );
};

export default CountDown;
