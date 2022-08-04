import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
import './Calendar.css';

const Calendar = ({ WEEKDAYS, MONTHS }) => {
  const currDate = new Date();
  const currMonth = currDate.getMonth() + 1;
  const currYear = currDate.getFullYear();
  const dateStr = `${currYear}-${currMonth < 10 ? '0' + currMonth : currMonth}`;
  // console.log('dateStr', dateStr)
  // console.log('currYear', currYear)

  const [month, setMonth] = useState(dateStr);
  // console.log('month', month)

  const calendarDays = useRef([]);

  useEffect(() => {
    const selectedMonth = Number(month.slice(5));
    const selectedYear = Number(month.slice(0, 4))
    console.log('selectedMonth', selectedMonth);
    console.log('selectedYear', selectedYear);

    const firstOfSelectedMonth = moment(`${selectedYear}-${selectedMonth}-01`);
    console.log('firstOfSelectedMonth', firstOfSelectedMonth);
    console.log('firstOffirstOfSelectedMonth.day()', firstOfSelectedMonth.day())
  }, [month])

  let weekdaysRow = WEEKDAYS.map(day => (
    <div className="weekdays">
      {day}
    </div>
  ))

  return (
    <div className="calendar-main-container">
      <h2>Calendar</h2>
      <div id="month-selector-container">
        <div id="month-selector">
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
          />
        </div>
      </div>
      <div id='calendar-container'>
        <div id="weekdays-row">
          {weekdaysRow}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
