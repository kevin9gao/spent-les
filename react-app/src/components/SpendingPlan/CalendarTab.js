import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlan, getUserPlans } from "../../store/plans";
import Calendar from "./Calendar";
import SpendingsSidebar from "./SpendingsSidebar";

const CalendarTab = ({ WEEKDAYS, MONTHS }) => {
  const [hidden, setHidden] = useState(true);
  const [calendarDate, setCalendarDate] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const selectedPlan = useSelector(state => state.plans['current']);

  const currDate = new Date();
  const currMonth = currDate.getMonth() + 1;
  const currYear = currDate.getFullYear();
  const dateStr = `${currYear}-${currMonth < 10 ? '0' + currMonth : currMonth}`;
  // console.log('dateStr', dateStr)
  // console.log('currYear', currYear)

  const [month, setMonth] = useState(dateStr);
  // console.log('month', month)

  useEffect(() => {
    dispatch(getUserPlans(user.id));
  }, [dispatch])

  useEffect(() => {
    dispatch(getSinglePlan(user.id, currYear, currMonth));
  }, [month])

  const toggleSidebar = e => {
    e.preventDefault();
    if (hidden === true) {
      // console.log('e', e);
      const day = e.target.innerHTML;
      // console.log('day', day);
      setCalendarDate(`${currYear}-${Number(currMonth) > 9 ?
                                    currMonth :
                                    '0' + currMonth}-${Number(day) > 9 ?
                                                      day :
                                                      '0' + day}`);
    }
    setHidden(!hidden);
  }

  let calendarSection;
  if (selectedPlan) {
    calendarSection = (
      <Calendar WEEKDAYS={WEEKDAYS} MONTHS={MONTHS} currDate={currDate}
                currMonth={currMonth} currYear={currYear} month={month}
                toggleSidebar={toggleSidebar} />
    );
  } else {
    calendarSection = (
      <h1>You do not have a spending plan for this month.</h1>
    )
  }

  return (
    <div className="calendar-tab-container">
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
      <div
        className="calendar-div"
      >
        {calendarSection}
      </div>
      <div
        id="sidebar"
        hidden={hidden}
      >
        <div id="sidebar-content-container">
          <SpendingsSidebar date={calendarDate} />
        </div>
      </div>
    </div>
  );
}

export default CalendarTab;
