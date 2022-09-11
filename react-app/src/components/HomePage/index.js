import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getFollowed, getFollowers } from "../../store/followers";
import { getUserPlans } from "../../store/plans";
import SpendingsBreakdown from "../SpendingPlan/SpendingsBreakdown";
import Feed from "./Feed";
import './HomePage.css';
import Overviews from "./Overviews";

const HomePage = ({ WEEKDAYS, MONTHS }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const plansObj = useSelector(state => state.plans['user-plans']);
  const plans = plansObj ? Object.values(plansObj) : null;
  const { page } = useParams();
  console.log('page', page);

  useEffect(() => {
    dispatch(getUserPlans(user.id));
  }, []);

  useEffect(() => {
    dispatch(getFollowers(user?.id));
    dispatch(getFollowed(user?.id));
  }, []);

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

  let overviews = plans?.map(plan => {
    const widgetMonth = `${plan.year}-${plan.month < 10 ? `0${plan.month}` : plan.month}`;
    return (
      <div className="widget-wrapper">
        <SpendingsBreakdown isWidget={true} widgetMonth={widgetMonth} />
      </div>
    );
  })

  let bodySection;

  if (page === 'overview') {
    bodySection = <Overviews />
  } else if (page === 'feed') {
    bodySection = <Feed />
  }

  if (!user) return null;

  return (
    <div className={`home-main-container`}>
      <div id="home-header-title">Home</div>
      <div className="home-header">
        <div id="home-header-wrapper">
          <div id="home-header-static">
            <div id="home-header-date">
              {dateStr}
            </div>
            <div id="home-header-greeting">
              {`${greeting}, ${user.username}`}
            </div>
          </div>
          <div id="home-header-dynamic">
            <div id="home-header-categories">
              <h2>Overview</h2>
              {/* <NavLink
                to='/home/overview'
                activeClassName="active"
                >
                  Overview
              </NavLink> */}
              {/* <NavLink
                to='/home/feed'
                activeClassName="active"
                >
                  Feed
              </NavLink> */}
            </div>
          </div>
        </div>
      </div>
      <div className="home-body">
        {bodySection}
      </div>
    </div>
  );
}

export default HomePage;
