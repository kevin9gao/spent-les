import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../../store/feed";
import { getFollowed } from "../../store/followers";
// import { getOtherUsersSpendings } from "../../store/spendings";

const Feed = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const followingObj = useSelector(state => state.followers['followed']);
  const following = followingObj ? Object.values(followingObj).map(user => user.id) : null;
  console.log('feed following', following);
  const [users, setUsers] = useState([]);
  console.log('users', users);

  useEffect(() => {
    dispatch(getFollowed(sessionUser.id));

    dispatch(loadFeed());

    async function fetchUsers() {
      const res = await fetch('/api/users/');
      const data = await res.json();
      setUsers(data.users);
    }
    fetchUsers();
  }, []);

  const feedObj = useSelector(state => state.feed);
  console.log('feedObj', feedObj)

  const followingFeed = feedObj ? Object.values(feedObj).filter(spending => {
    return following.includes(spending.user_id);
  }) : null;
  if (followingFeed) followingFeed.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log('followingFeed', followingFeed);

  const generateFeed = spending => {
    const spendingUser = users?.filter(user => user.id === spending.user_id)[0];
    // console.log('spendingUser', spendingUser);

    return (
      <div className="feed-spendings-wrapper">
        <div className="feed-spendings">
          <div className="feed-headers">
            <img className="feed-avatars" src={spendingUser?.profile_pic_url} />
            <div>
              <span>
                {`${spendingUser?.username} spent $${spending.amount} on ${spending.transaction_name}`}
              </span>
              <span className="spending-dates">
                {`${spending.month}/${new Date(spending.date).getDate()}/${spending.year}`}
              </span>
            </div>
          </div>
          <span className="spending-details">
            {spending.transaction_notes}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div id="feed-wrapper">
      <h2>Recent spendings by users you follow:</h2>
      <div id="feed-spendings-wrapper">
        {followingFeed && (followingFeed.map(spending => generateFeed(spending)))}
      </div>
    </div>
  );
}

export default Feed;
