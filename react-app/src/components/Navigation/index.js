import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton";
import './Navigation.css';

const Navigation = () => {
  const user = useSelector(state => state.session.user);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar">
          <h1>Spent-Lès</h1>
          <div
            className="navbar-links">
            <NavLink to='/home' exact>
              Home
            </NavLink>
          </div>
          <div
            className="navbar-links">
            <NavLink to={`/users/${user.id}/plans`} exact>
              My Spending Plans
            </NavLink>
          </div>
          {/* <div
            className="navbar-links">
            <NavLink to={`/users/${user.id}/DMs`} exact>
              Messages
            </NavLink>
          </div> */}
          <div
            className="navbar-links">
            <NavLink to='/users' exact={true} activeClassName='active'>
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
