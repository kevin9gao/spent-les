import React, { useEffect, useState } from "react";
import moment from 'moment';
import SpendingsSidebar from "./SpendingsSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAnotherUsersPlans, getSinglePlan, getUserPlans } from "../../store/plans";
import CreatePlanModal from './CreatePlanModal';
import { useHistory, useParams } from "react-router-dom";
import DeletePlanModal from "./DeletePlanModal";
import EditPlanModal from "./EditPlanModal";
import { getSpendings } from "../../store/spendings";
import SpendingIcons from "../Spendings/SpendingsIcons";
import './Calendar.css';
import TipSection from "../Tips/TipSection";
import NewTipForm from "../Tips/NewTipForm";

const Calendar = ({ WEEKDAYS, MONTHS }) => {
  const history = useHistory();
  const [hidden, setHidden] = useState(true);
  const [calendarDate, setCalendarDate] = useState('');
  const [otherUser, setOtherUser] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const currPlan = useSelector(state => state.plans.current);

  const [tipChanged, setTipChanged] = useState(false);

  const { userId, date } = useParams();
  const isOwner = user.id === Number(userId);
  // console.log('userId, date', userId, date);


  const currDate = moment(date);
  const currMonth = currDate.month() + 1;
  const currYear = currDate.year();
  const dateStr = `${currYear}-${currMonth < 10 ? '0' + currMonth : currMonth}`;
  // console.log('currDate', currDate)
  // console.log('dateStr', dateStr)
  // console.log('currYear', currYear)
  // console.log('currMonth', currMonth)

  const [month, setMonth] = useState(dateStr);
  // console.log('month', month)

  const calendar = [];

  const selectedMonthStr = month?.slice(5);
  const selectedYearStr = month?.slice(0, 4);
  const selectedMonth = Number(month?.slice(5));
  const selectedYear = Number(month?.slice(0, 4));
  // console.log('selectedMonth', selectedMonthStr);
  // console.log('selectedYear', selectedYearStr);

  useEffect(() => {
    dispatch(getUserPlans(user.id));
  }, [])

  useEffect(() => {
    dispatch(getSinglePlan(isOwner ?
      user.id :
      userId, selectedYearStr, selectedMonthStr));
    dispatch(getSpendings(currPlan?.id));
  }, [month])

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
          calendar[week][day] = `${currMonth === 1 ?
            currYear - 1 :
            currYear}-${currMonth - 1 < 10 ?
              `0${currMonth - 1}` :
              currMonth - 1}-${leadingDate}`;
          leadingDate++;
          // fill in dates of current month
        } else if (dayOfSelectedMonth <= lastOfSelectedMonth) {
          calendar[week][day] = `${currYear}-${currMonth < 10 ?
            `0${currMonth}` :
            currMonth}-${dayOfSelectedMonth < 10 ?
              `0${dayOfSelectedMonth}` :
              dayOfSelectedMonth}`;
          dayOfSelectedMonth++;
          // fill in dates of next month
        } else {
          calendar[week][day] = `${currYear}-${currMonth + 1 < 10 ?
            `0${currMonth + 1}` :
            currMonth + 1}-${trailingDate < 10 ?
              `0${trailingDate}` :
              trailingDate}`;
          trailingDate++;
        }
      }
    }
  }

  let weekdaysRow = WEEKDAYS.map((day, weekdayIdx) => (
    <div
      className="weekdays"
      key={weekdayIdx}
    >
      {day}
    </div>
  ))

  const toggleSidebar = (e, dayIdx, weekIdx, dayStr) => {
    e.preventDefault();

    const day = dayStr.slice(8, 10);
    // console.log('dayIdx', dayIdx)
    // console.log('weekIdx', weekIdx)
    const isLastMonth = (weekIdx === 0) && (dayIdx < 6) && (Number(day) > 21);
    const isNextMonth = (weekIdx > 3) && (Number(day) < 15);
    const isJanuary = Number(currMonth) === 1;
    const isDecember = Number(currMonth) === 12;

    let targetMonth = Number(currMonth);
    let targetYear = Number(currYear);
    if (isLastMonth && !isJanuary) {
      targetMonth--;
      // console.log('last month targetMonth', targetMonth)
    } else if (isLastMonth && isJanuary) {
      targetMonth = 12;
      targetYear--;
    } else if (isNextMonth && !isDecember) {
      targetMonth++;
    } else if (isNextMonth && isDecember) {
      targetMonth = 1;
      targetYear++;
    }

    if (hidden === true) {
      // console.log('e', e);
      // console.log('day', day);
      setCalendarDate(`${targetYear}-${Number(targetMonth) > 9 ?
        targetMonth :
        '0' + targetMonth
        }-${day}`);
    }
    // console.log('calendarDate', calendarDate)
    setHidden(!hidden);
  }

  const changeMonth = e => {
    e.preventDefault();

    setMonth(e.target.value);
    return history.push(`/users/${user.id}/plans/calendar/${e.target.value}`);
  }

  const changeMonthOnOtherUser = e => {
    e.preventDefault();

    setMonth(e.target.value);
    return history.push(`/users/${userId}/calendar/${e.target.value}`);
  }

  // if currently logged in user is not owner of plan
  const otherPlansObj = useSelector(state => state.plans['other-users-plans']);
  const otherPlans = otherPlansObj ? Object.values(otherPlansObj) : null;
  useEffect(() => {
    if (!userId) {
      return;
    }

    if (!isOwner) {
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const paramsUser = await response.json();
        if (paramsUser) setOtherUser(paramsUser);
      })();
      dispatch(getAnotherUsersPlans(userId));
    }
  }, [userId]);
  // console.log('otherUser', otherUser)
  // console.log('otherPlans', otherPlans)

  if (!isOwner) {
    const options = otherPlans?.map(plan => {
      return {
        value: `${plan.year}-${plan.month < 10 ? `0${plan.month}` : plan.month}`,
        label: plan.plan_name
      };
    });
    // console.log('options', options);
    // console.log('currPlan', currPlan);

    if (!options?.length) {
      return (
        <div className="not-owner calendar-main-container not-owner-main-container">
          <h2>{otherUser && `${otherUser.username} does not have any spending plans.`}</h2>
        </div>
      );
    }

    return (
      <div className="not-owner calendar-main-container not-owner-main-container">
        <h2>{currPlan?.plan_name}</h2>
        <div id="month-selector-container" className="not-owner">
          <div id="month-selector" className="not-owner">
            <select onChange={changeMonthOnOtherUser}>
              {options?.map(opt => (
                <option
                  value={opt.value}
                  key={opt.label}
                >{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div id='calendar-container'>
          <div id="weekdays-row">
            {weekdaysRow}
          </div>
          <div id="calendar-body">
            {calendar && (calendar.map((week, weekIdx) => (
              <div
                className="calendar-weeks"
                key={weekIdx}>
                {week.map((dayStr, dayIdx) => (
                  <div
                    className="calendar-days"
                    onClick={e => toggleSidebar(e, dayIdx, weekIdx, dayStr)}
                    key={dayIdx}
                  >
                    <SpendingIcons date={`${dayStr.slice(0, 4)}-${dayStr.slice(5, 7)}-${dayStr.slice(8, 10)}`} calendarDay={dayStr.slice(8, 10)} />
                  </div>
                ))}
              </div>
            )))}
          </div>
        </div>
        <div className="tips-container">
          <div id="calendar-tips-section">
            <TipSection plan={currPlan} tipChanged={tipChanged} setTipChanged={setTipChanged} />
          </div>
          <div id="calendar-new-tip-container">
            <NewTipForm plan={currPlan} setTipChanged={setTipChanged} />
          </div>
        </div>
        <div
          id="sidebar"
          hidden={hidden}
        >
          <SpendingsSidebar date={calendarDate} isOwner={false} />
        </div>
      </div>
    );
  }

  if (currPlan?.month !== selectedMonth) {
    return (
      <div className="no-plan-container">
        <h1>You have not created a spending plan for this month.</h1>
        <div id="month-selector-container">
          <div id="month-selector">
            <input
              type="month"
              value={month}
              onChange={changeMonth}
            />
          </div>
        </div>
        <div id="calendar-create-plan-container">
          <CreatePlanModal month={selectedMonth} year={selectedYear} MONTHS={MONTHS} />
        </div>
      </div>
    )
  }

  return (
    <div
      className="calendar-main-container"
    // onClick={closeSidebar}
    >
      <h2>{currPlan?.plan_name}</h2>
      <div id="month-selector-container">
        <div id="month-selector">
          <input
            type="month"
            value={month}
            onChange={changeMonth}
          />
        </div>
      </div>
      <div id='calendar-container'>
        <div id="weekdays-row">
          {weekdaysRow}
        </div>
        <div id="calendar-body">
          {calendar && (calendar.map((week, weekIdx) => (
            <div
              className="calendar-weeks"
              key={weekIdx}>
              {week.map((dayStr, dayIdx) => (
                <div
                  className="calendar-days"
                  onClick={e => toggleSidebar(e, dayIdx, weekIdx, dayStr)}
                  key={dayIdx}
                >
                  <SpendingIcons date={`${dayStr.slice(0, 4)}-${dayStr.slice(5, 7)}-${dayStr.slice(8, 10)}`} calendarDay={dayStr.slice(8, 10)} />
                </div>
              ))}
            </div>
          )))}
          <div id="calendar-edit-delete">
            <div id="edit-plan-modal">
              <EditPlanModal plan={currPlan} />
            </div>
            <div id="delete-plan-modal">
              <DeletePlanModal plan={currPlan} />
            </div>
          </div>
        </div>
      </div>
      <div className="tips-container">
        <div id="calendar-tips-section">
          <TipSection plan={currPlan} tipChanged={tipChanged} setTipChanged={setTipChanged} />
        </div>
        <div id="calendar-new-tip-container">
          <NewTipForm plan={currPlan} setTipChanged={setTipChanged} />
        </div>
      </div>
      <div
        id="sidebar"
        hidden={hidden}
      >
        <SpendingsSidebar date={calendarDate} />
      </div>
    </div>
  );
}

export default Calendar;
