import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, useParams } from "react-router-dom";
import moment from "moment";
import './SpendingPlanMain.css';
import SpendingsBreakdown from "./SpendingsBreakdown";
import Calendar from "./Calendar";

const SpendingPlanMain = ({ WEEKDAYS, MONTHS }) => {
  const user = useSelector(state => state.session.user);
  const [otherUser, setOtherUser] = useState({});
  const [avatarUrl, setAvatarUrl] = useState(user.profile_pic_url);
  const { userId, breakdownOrCalendar, date } = useParams();
  // console.log('userId, breakdownOrCalendar, date', userId, breakdownOrCalendar, date);
  // console.log('avatarUrl', avatarUrl);

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

  if (avatarUrl === null) {
    setAvatarUrl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU');
  }

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
              src={avatarUrl}
              id='spending-plan-main-avatar'
              alt='avatar'
              onError={({ target }) => {
                target.onError = null;
                target.src = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/link_broken.png';
              }}
            />
          </div>
          <div id="spending-plan-main-header-text">
            <div id="spending-plan-main-header-title">
              My Monthly Spending Plans
            </div>
            <div id="spending-plan-main-header-categories">
              <NavLink
                to={`/users/${user.id}/plans/calendar/${year}-${month}`}
                activeClassName='active' >
                Calendar
              </NavLink>
              <NavLink
                to={`/users/${user.id}/plans/breakdown`}
                activeClassName='active' >
                Spendings Breakdown
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
      <Redirect to={`/users/${otherUser.id}/calendar/${year}-${month}`} />
    );
  }
}

export default SpendingPlanMain;
