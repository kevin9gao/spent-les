import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFollowers } from "../../store/followers";

const Followers = ({ setIsExtended }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const followersObj = useSelector(state => state.followers['followers']);
  // console.log('followersObj', followersObj);
  const followers = followersObj ? Object.values(followersObj) : null;
  console.log('followers', followers);

  const userComponents = followers?.map(user => {
    return (
      <li
        key={user.id}
        className='followers' >
        <NavLink to={`/users/${user.id}`}>
          <div className="user-buttons">
            <div className="user-pic">
              <img className="avatar"
                src={user.profile_pic_url}
                alt='avatar'
                onError={({ target }) => {
                  target.onError = null;
                  target.src = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/link_broken.png'
                }}
              />
            </div>
            <div className="user-username">
              {user.username}
            </div>
          </div>
        </NavLink>
      </li>
    );
  });

  return (
    <div className="followers-container">
      <h1>Followers</h1>
      <ul
        className={`users-list followers`}>
          {userComponents}
      </ul>
    </div>
  );
}

export default Followers;
