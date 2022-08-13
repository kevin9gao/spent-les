import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Logo from '../../images/logo.jpg';
import Check from '../../images/spent-les-check.png';
import './Auth.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
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
    return <Redirect to='/home' />;
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
              <div>
                {errors.map((error, ind) => (
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
                  required={true}
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
      <footer className='footer'>
        <div className='footer-wrapper'>
          <div id='app-name'>
            Spent-Lès
          </div>
          <div id='dev-name'>
            Kevin Gao
          </div>
          <div id='footer-links'>
            <a
              href="https://www.linkedin.com/in/kevin-gao-81a7b8241/"
              target='_blank'
              rel="noreferrer"
            >
              <img
                src="https://sharethis.imgix.net/2017/05/LinkedIn.png?fm=webp&auto=compress&q=1"
                className="anchor-images"
              />
            </a>
            <a
              href="https://github.com/kevin9gao"
              target='_blank'
              rel="noreferrer"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                className="anchor-images"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUpForm;
