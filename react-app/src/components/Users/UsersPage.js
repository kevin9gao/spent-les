import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const UsersPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="users-page main-container">
      <div className="users-page main-header">
        <div className="users-page-main-avatar">
          <NavLink to={`/users/${sessionUser.id}`}>
            <img
              src={sessionUser.profile_pic_url}
              id='users-page-avatar'
              alt='avatar'
              onError={({ target }) => {
                target.onError = null;
                target.src = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/link_broken.png';
              }}
            />
          </NavLink>
        </div>
        <div className="users-page-header-text">
          <div id="users-page-header-title">
            Users
          </div>
          <div id="users-page-categories">
            <NavLink
              to='/users/list'
              activeClassName="active"
              >
                Users List
            </NavLink>
            <NavLink
              to={`/users/${sessionUser.id}/following`}
              activeClassName='active'
              >
                Following
            </NavLink>
            <NavLink
              to={`/users/${sessionUser.id}/followers`}
              activeClassName='active'
              >
                Followers
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
