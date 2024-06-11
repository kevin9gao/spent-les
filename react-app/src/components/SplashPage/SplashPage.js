import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import Logo from '../../images/logo.jpg';
import AboutModal from "../About/AboutModal";
import DemoUserButton from '../auth/DemoUserButton';
import Wallet from "../../images/money_flying.jpg";
import Models from "../../images/money_models.jpg";
import './SplashPage.css';

const SplashPage = () => {
  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to='/home' />
  }

  return (
    <div className="splash-page">
      <div className="header">
        <div id="left">
          <div id="logo-wrapper">
            <NavLink to='/'>
              <img
                id="logo"
                src={Logo}
                alt='logo'
              />
              <span>Spent-Lès</span>
            </NavLink>
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
      <div className="main">
        <div className="left-col">
          <div id="left-text-wrapper">
            <div className="left-text">
              <h3>Find out where your money is going.</h3>
              <p>
                Ever wonder where your money went at the end of the month?
                Wonder no more, because Spent-Lès has got your back.
              </p>
            </div>
            <div id="left-links">
              <NavLink to='sign-up'>
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
        <div className="right-col">
          <div id="right-images-wrapper">
            <div id="right-images">
              <div id="img-1">
                <img
                  src={ Wallet }
                  alt="wallet"
                  id="wallet-img"
                  />
              </div>
              <div id="img-2">
                <img
                  src={ Models }
                  alt="graphs"
                  id="graphs-img"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
