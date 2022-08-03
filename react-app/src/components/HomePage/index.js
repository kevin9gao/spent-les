import React from "react";
import { useDispatch, useSelector } from "react-redux";

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const HomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const date = new Date();
  const weekday = WEEKDAYS[date.getDay()]
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const dateStr = `${weekday}, ${month} ${day}`;

  let greeting;

  const hour = date.getHours();

  switch (true) {
    case (hour < 4):
      greeting = 'Good Evening';
      break;
    case (hour < 12):
      greeting = 'Good Morning';
      break;
    case (hour < 17):
      greeting = 'Good Afternoon';
      break;
    case (hour < 24):
      greeting = 'Good Evening';
  }

  return (
    <div className="home-main-container">
      <div className="home-header">
        <div id="home-header-date">
          {dateStr}
        </div>
        <div id="home-header-greeting">
          {`${greeting}, ${user.username}`}
        </div>
      </div>
      <div className="home-overview">
        Plan Overviews
      </div>
    </div>
  );
}

export default HomePage;
