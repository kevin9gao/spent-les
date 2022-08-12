import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../images/logo.jpg';
import AboutModal from "../About/AboutModal";
import DemoUserButton from '../auth/DemoUserButton';
import './SplashPage.css';

const SplashPage = () => {
  return (
    <div className="splash-page">
      <div className="header">
        <div id="left">
          <div id="logo-wrapper">
            <img
              id="logo"
              src={Logo}
              alt='logo'
              />
            <span>Spent-Lès</span>
          </div>
          <div id="about-wrapper">
            <AboutModal />
          </div>
        </div>
        <div id="right">
          <DemoUserButton />
          <NavLink to='/login'>
            Log In
          </NavLink>
          <NavLink to='sign-up'>
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
