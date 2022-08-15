import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import './Users.css';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  const currDate = moment();
  const currMonth = currDate.month() + 1;
  const currYear = currDate.year();
  const dateStr = `${currYear}-${currMonth < 10 ? '0' + currMonth : currMonth}`;

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='users-container users-page'>
      <div className='user-card'>
        <div className='user-card-row'>
          <strong>Username</strong> {user.username}
        </div>
        <div className='user-card-row'>
          <strong>Email</strong> {user.email}
        </div>
        <div className='user-card-row'>
          <strong>Annual Income</strong> {user.annual_income === 'None' ? 'Private' : user.annual_income}
        </div>
        <div className='user-link-row'>
          <NavLink to={`/users/${userId}/calendar/${dateStr}`}>
            {`${user.username}'s Spending Plans`}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default User;
