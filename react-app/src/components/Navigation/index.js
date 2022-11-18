import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";
import Logo from '../../images/logo.jpg';
import moment from "moment";
import './Navigation.css';

const Navigation = () => {
  const user = useSelector(state => state.session.user);

  const currDate = moment();
  const month = currDate.month() + 1;
  const year = currDate.year();

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-block-wrapper">
          <div className="navbar">
            <div className="logo-wrapper">
              <img
                src={Logo}
                alt='logo'
                className="logo"
                />
              <span>Spent-Lès</span>
            </div>
            <div
              className="navbar-links">
              <NavLink
                to='/home/overview'
                exact>
                Home
              </NavLink>
            </div>
            <div
              className="navbar-links">
              <NavLink
                to={`/users/${user.id}/plans/calendar/${year}-${month}`}
                exact>
                My Spending Plans
              </NavLink>
            </div>
            <div
              className="navbar-links">
              <NavLink
                to='/users/list'
                exact={true}
                activeClassName='active'>
                Users
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div
        className="navigation-profile-btn">
          <ProfileButton />
      </div>
    </>
  );
}

export default Navigation;
