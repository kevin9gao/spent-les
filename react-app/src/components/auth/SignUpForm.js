import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Logo from '../../images/logo.jpg';
import Check from '../../images/spent-les-check.png';
import './Auth.css';
import Footer from '../Footer';

const SignUpForm = () => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  // console.log('users', users)

  useEffect(() => {
    const errors = [];

    if (!username.length) {
      errors.push('Please provide a username.');
    } else if (username.length > 40) {
      errors.push('Username cannot be longer than 40 characters.');
    } else if (users.map(user => user.username).includes(username)) {
      errors.push('Username is taken.');
    }

    if (!email.length) {
      errors.push('Please provide a email.');
    } else if (email.length > 255) {
      errors.push('Email cannot be longer than 255 characters.');
    } else if (users.map(user => user.email).includes(email)) {
      errors.push('Email is taken.');
    } else if (!email.includes('@')) {
      errors.push('Please provide a valid email.');
    }

    if (!password.length) {
      errors.push('Please provide a password.');
    } else if (repeatPassword !== password) {
      errors.push('Confirm password must be the same as password.');
    }



    setValidationErrors(errors);
  }, [username, email, password, repeatPassword]);

  const onSignUp = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      const data = await dispatch(signUp(username, email, password));
    } else {
      setHideErrors(false);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home/overview' />;
  }

  return (
    <div className="login-wrapper">
      <div className="header">
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
      <div className='main'>
        <div className='left-col sign-up'>
          <div id='left-form-wrapper'>
            <h4>Sign Up</h4>
            <form onSubmit={onSignUp} id='sign-up-form'>
              <div hidden={hideErrors}>
                {validationErrors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  placeholder='username'
                ></input>
              </div>
              <div>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  placeholder='name@email.com'
                ></input>
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  placeholder='password'
                ></input>
              </div>
              <div>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  placeholder='confirm password'
                ></input>
              </div>
              <button type='submit'>Sign Up</button>
            </form>
            <div className='login-reroute'>
              <div>Already have an account?</div>
              <NavLink to='/login'>
                Log In.
              </NavLink>
            </div>
          </div>
        </div>
        <div className='right-col sign-up'>
          <div id='right-text-wrapper'>
            <div id='sign-up-list-wrapper'>
              <div id='doodle-wrapper'>
                <img
                  src='https://st4.depositphotos.com/4038693/22588/v/600/depositphotos_225886572-stock-illustration-concept-saving-money-mini-business.jpg'
                  alt='pig-doodle'
                  id='piggy-bank-doodle' />
              </div>
              <h2 id='sign-up-list-header'>Sign up and:</h2>
              <div className='list-item'>
                <div className='list-icon'>
                  <img
                    src={Check}
                    alt='check'
                    className='list-icon-img' />
                </div>
                <p>Log your monthly spendings</p>
              </div>
              <div className='list-item'>
                <div className='list-icon'>
                  <img
                    src={Check}
                    alt='check'
                    className='list-icon-img' />
                </div>
                <p>View your cash flow</p>
              </div>
              <div className='list-item'>
                <div className='list-icon'>
                  <img
                    src={Check}
                    alt='check'
                    className='list-icon-img' />
                </div>
                <p>Manage your finances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default SignUpForm;
