import React, { useEffect, useState } from "react";
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

  const calendar = [];

  useEffect(() => {

    console.log('calendar', calendar);
  }, [month])

  const selectedMonth = Number(month.slice(5));
  const selectedYear = Number(month.slice(0, 4));
  // console.log('selectedMonth', selectedMonth);
  // console.log('selectedYear', selectedYear);

  const firstOfSelectedMonth = moment(`${selectedYear}-${selectedMonth}-01`).day();
  // console.log('firstOfSelectedMonth', firstOfSelectedMonth);

  const lastOfSelectedMonth = moment([selectedYear, 0, 31]).month(selectedMonth - 1).date();
  // console.log('lastOfSelectedMonth',lastOfSelectedMonth)

  const lastOfPreviousMonth = moment([selectedMonth === 1 ?
    selectedYear - 1 :
    selectedYear, 0, 31]).month(selectedMonth - 2).date();
  // console.log('lastOfPreviousMonth', lastOfPreviousMonth)

  let dayOfSelectedMonth = 1;
  // Set leadingDate to the first date from the prev month that should fill the calendar
  let leadingDate = lastOfPreviousMonth - firstOfSelectedMonth + 1;
  let trailingDate = 1;
  // console.log('leadingDate', leadingDate);

  while (dayOfSelectedMonth < lastOfSelectedMonth + 1) {
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        // If the current week has not been defined, define it as empty array
        if (!calendar[week]) calendar[week] = [];

        // fill in leading dates with dates from previous month
        if (week === 0 && day < firstOfSelectedMonth) {
          calendar[week][day] = leadingDate;
          leadingDate++;
          // fill in dates of current month
        } else if (dayOfSelectedMonth <= lastOfSelectedMonth) {
          calendar[week][day] = dayOfSelectedMonth;
          dayOfSelectedMonth++;
          // fill in dates of next month
        } else {
          calendar[week][day] = trailingDate;
          trailingDate++;
        }
      }
    }
  }

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
        <div id="calendar-body">
          {calendar && (calendar.map(week => (
            <div className="calendar-weeks">
              {week.map(day => (
                <div className="calendar-days">
                  {day}
                </div>
              ))}
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
