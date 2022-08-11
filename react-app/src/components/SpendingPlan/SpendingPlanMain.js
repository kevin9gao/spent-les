import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import './SpendingPlanMain.css';
import SpendingsBreakdown from "./SpendingsBreakdown";
import Calendar from "./Calendar";

const SpendingPlanMain = ({ WEEKDAYS, MONTHS }) => {
  const user = useSelector(state => state.session.user);
  const [otherUser, setOtherUser] = useState({});
  const { userId, breakdownOrCalendar, date } = useParams();
  console.log('userId, breakdownOrCalendar, date', userId, breakdownOrCalendar, date);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setOtherUser(user);
    })();
  }, [userId]);

  const currDate = moment();
  const month = currDate.month() + 1;
  const year = currDate.year();

  let bodySection;
  if (breakdownOrCalendar === 'breakdown') {
    bodySection = (
      <SpendingsBreakdown />
    );
  } else if (breakdownOrCalendar === 'calendar') {
    bodySection = (
      <Calendar WEEKDAYS={WEEKDAYS} MONTHS={MONTHS} />
    )
  }

  if (!user) return null;

  if (user.id === Number(userId)) {
    return (
      <div className="spending-plan-main-container">
        <div className="spending-plan-main-header">
          <div id="spending-plan-main-user-avatar">
            <img
              src={user.profile_pic_url}
              id='spending-plan-main-avatar'
              alt='avatar'
            />
          </div>
          <div id="spending-plan-main-header-text">
            <div id="spending-plan-main-header-title">
              My Monthly Spending Plans
            </div>
            <div id="spending-plan-main-header-categories">
              <NavLink to={`/users/${user.id}/plans/breakdown`}>
                {/* onClick={setBreakdownOrCalendar('breakdown')} > */}
                Spendings Breakdown
              </NavLink>
              <NavLink to={`/users/${user.id}/plans/calendar/${year}-${month}`}>
                {/* onClick={setBreakdownOrCalendar('calendar')} > */}
                Calendar
              </NavLink>
            </div>
          </div>
        </div>
        <div id="spending-plan-main-body">
          {bodySection}
        </div>
      </div>
    );
  } else {
    return (
      <div className="other-user-plan-container">
        <NavLink to={`/users/${otherUser.id}/calendar/${year}-${month}`}>
          {`${otherUser.username}'s Spending Plans`}
        </NavLink>
      </div>
    );
  }
}

export default SpendingPlanMain;
