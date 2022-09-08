import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getFollowed, getFollowers } from "../../store/followers";
import UsersList from "../UsersList";
import Following from "./Following";
import Followers from "./Followers";

const UsersPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { userId, page } = useParams();
  // console.log('userId', userId);
  // console.log('page', page);
  const [isExtended, setIsExtended] = useState(false);

  useEffect(() => {
    dispatch(getFollowers(sessionUser.id));
    dispatch(getFollowed(sessionUser.id));
  }, []);

  let bodySection;

  if (page === undefined) {
    bodySection = <UsersList />
  } else if (page === 'followers') {
    bodySection = <Followers setIsExtended={setIsExtended} />
  } else if (page === 'following') {
    bodySection = <Following setIsExtended={setIsExtended} />
  }

  return (
    <div
      className={`users-page main-container ${isExtended ? 'extended' : ''}`}>
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
                Users
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
      <div id="users-page-body">
        {bodySection}
      </div>
    </div>
  );
}

export default UsersPage;
