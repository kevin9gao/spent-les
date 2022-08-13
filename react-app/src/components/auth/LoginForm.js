import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Logo from '../../images/logo.jpg';
import './Auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='login-wrapper' id='login-wrapper'>
      <div id='login-container'>
        <div id='login-form-wrapper'>
          <div id='login-header'>
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
          </div>
          <h4>Log in to Spent-Lès</h4>
          <form onSubmit={onLogin} id='login-form'>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                name='email'
                type='text'
                placeholder='name@email.com'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
          <div className='login-reroute' id='signup-reroute'>
            <div>Don't have an account?</div>
            <NavLink to='/sign-up'>
              Sign Up.
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
