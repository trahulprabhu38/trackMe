import React from 'react'
import { getDate, setMonth } from "date-fns";
import { useState,useEffect } from 'react';

const MonthData = () => {

    const [currentDate, setCurrentDate] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const [month, setMonth] = useState('');
    const [standardView , setStandardView] = useState('')

    useEffect(()=>{
        const date = new Date();

        // Get day name (short and full)
        const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        const dayFull = daysFull[date.getDay()];
        
        // Get month name
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        
        // Get day of the month
        const dayOfMonth = date.getDate().toString().padStart(2, '0');
        
        // Format: Mon Feb 03
        const formattedShort = `${daysFull} ${month} ${dayOfMonth}`;
        console.log(formattedShort);  // Example: Mon Feb 03
        
        
        console.log(dayFull);  // Example: Monday
        
        setCurrentDay(dayFull)
        setCurrentDate(dayOfMonth)
        setMonth(month)
        setStandardView(date.toLocaleDateString())
        
    },[])

  return (
    <div>
      {currentDate}- {currentDay}-{month}
    <br />
      {standardView}
    </div>
  )
}

export default MonthData
