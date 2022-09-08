import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Following = ({ setIsExtended }) => {
  const sessionUser = useSelector(state => state.session.user);
  const followedObj = useSelector(state => state.followers['followed']);
  const following = followedObj ? Object.values(followedObj) : null;

  if (following && following.length > 4) setIsExtended(true);

  const userComponents = following?.map(user => {
    return (
      <li
        key={user.id}
        className='following' >
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
    <div className={`following-container ${following?.length > 4 ? 'extended' : ''}`}>
      <h1>Following</h1>
      <ul
        className={`users-list following`}>
          {userComponents}
      </ul>
    </div>
  );
}

export default Following;
