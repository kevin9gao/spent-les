import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";
import Logo from '../../images/logo.jpg';
import './Navigation.css';

const Navigation = () => {
  const user = useSelector(state => state.session.user);
  const [selectedTab, setSelectedTab] = useState('home');
  console.log('selectedTab', selectedTab);

  return (
    <>
      <div className="navbar-container">
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
              to='/home'
              exact>
              Home
            </NavLink>
          </div>
          <div
            className="navbar-links">
            <NavLink
              to={`/users/${user.id}/plans/breakdown`}
              exact>
              My Spending Plans
            </NavLink>
          </div>
          <div
            className="navbar-links">
            <NavLink
              to='/users'
              exact={true}
              activeClassName='active'>
              Users
            </NavLink>
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
