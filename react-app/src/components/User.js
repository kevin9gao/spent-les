import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

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
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <NavLink to={`/users/${userId}/calendar/${dateStr}`}>
        {`${user.username}'s Spending Plans`}
      </NavLink>
    </ul>
  );
}
export default User;
