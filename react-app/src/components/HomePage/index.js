import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = ({ WEEKDAYS, MONTHS }) => {
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

  if (!user) return null;

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
        <h3>Plan Overviews</h3>
      </div>
    </div>
  );
}

export default HomePage;
