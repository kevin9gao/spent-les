import React, { useEffect, useState } from "react";
import moment from 'moment';
import './Calendar.css';
import SpendingsSidebar from "./SpendingsSidebar";

const Calendar = ({ WEEKDAYS, MONTHS, currDate, currMonth, currYear, month, toggleSidebar }) => {
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

  // const toggleSidebar = e => {
  //   e.preventDefault();
  //   if (hidden === true) {
  //     // console.log('e', e);
  //     const day = e.target.innerHTML;
  //     // console.log('day', day);
  //     setCalendarDate(`${currYear}-${Number(currMonth) > 9 ?
  //                                   currMonth :
  //                                   '0' + currMonth}-${Number(day) > 9 ?
  //                                                     day :
  //                                                     '0' + day}`);
  //   }
  //   setHidden(!hidden);
  // }

  // const closeSidebar = e => {
  //   e.preventDefault();
  //   setHidden(true);
  // }

  return (
    <div
      className="calendar-main-container"
      // onClick={closeSidebar}
    >
      <div id='calendar-container'>
        <div id="weekdays-row">
          {weekdaysRow}
        </div>
        <div id="calendar-body">
          {calendar && (calendar.map(week => (
            <div className="calendar-weeks">
              {week.map(day => (
                <div
                  className="calendar-days"
                  onClick={toggleSidebar}
                >
                  {day}
                </div>
              ))}
            </div>
          )))}
        </div>
      </div>
      {/* <div
        id="sidebar"
        hidden={hidden}
      >
        <div id="sidebar-content-container">
          <SpendingsSidebar date={calendarDate} />
        </div>
      </div> */}
    </div>
  );
}

export default Calendar;
