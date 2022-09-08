import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import './Users.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAnotherUsersPlans } from '../store/plans';
import { followUser, unfollowUser } from '../store/followers';

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);

  const followedUsers = useSelector(state => state.followers['followed']);
  const [followed, setFollowed] = useState(followedUsers ? userId in followedUsers : false);
  // console.log('followed', followed);
  // console.log('followedUsers', followedUsers);
  // console.log('userId in followedUsers', userId in followedUsers);

  const plansObj = useSelector(state => state.plans['other-users-plans']);
  const plans = plansObj ? Object.values(plansObj) : null;

  const options = plans?.map(plan => {
    return `${plan.year}-${plan.month < 10 ? `0${plan.month}` : plan.month}`
  });
  console.log('options', options)

  const currDate = options ? moment(options[0]) : null;
  const currMonth = currDate?.month() + 1;
  const currYear = currDate?.year();
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

    dispatch(getAnotherUsersPlans(userId));
  }, [userId]);

  const handleFollow = e => {
    e.preventDefault();

    if (!followed) {
      dispatch(followUser(sessionUser.id, userId));
      setFollowed(true);
    } else {
      dispatch(unfollowUser(sessionUser.id, userId));
      setFollowed(false);
    }
  }

  const handleBack = e => {
    e.preventDefault();

    history.goBack();
  }

  if (!user) {
    return null;
  }

  return (
    <div className='users-container users-page'>
      <div className='back-wrapper'>
        <button
          className='back-btn'
          onClick={handleBack}
          >Back</button>
      </div>
      <div className='user-card'>
        <div className={`user-card-row ${followed ? 'followed' : 'not-followed'}`} id='follow-row'>
          <button onClick={handleFollow}>{followed ? 'Unfollow' : 'Follow'}</button>
        </div>
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
