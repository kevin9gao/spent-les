import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Users.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.filter(user => user.id !== sessionUser.id).map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>
          <div className='user-buttons'>
            {user.username}
          </div>
        </NavLink>
      </li>
    );
  });

  return (
    <div className='users-container'>
      <h1>User List: </h1>
      <ul className='users-list'>{userComponents}</ul>
    </div>
  );
}

export default UsersList;
