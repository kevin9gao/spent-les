const LOAD = 'followers/LOAD';
const FOLLOW = 'followers/FOLLOW';
const UNFOLLOW = 'followers/UNFOLLOW';

const load = list => ({
  type: LOAD,
  list
})

const follow = user => ({
  type: FOLLOW,
  user
})

const unfollow = user => ({
  type: UNFOLLOW,
  user
})

export const getFollowers = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/followers`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const getFollowed = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/followed`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const followUser = (followerId, followedId) => async dispatch => {
  const res = await fetch(`/api/users/${followerId}/follow/${followedId}`, {
    method: 'POST'
  });

  if (res.ok) {
    const user = await res.json();
    dispatch(follow(user));
    return user;
  }
}

export const unfollowUser = (followerId, followedId) => async dispatch => {
  const res = await fetch(`/api/users/${followerId}/unfollow/${followedId}`, {
    method: 'POST'
  });

  if (res.ok) {
    const user = await res.json();
    dispatch(unfollow(user));
    return user;
  }
}

let newState;

const followersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      newState = {};
      if (action.list['followers']) {
        const followers = action.list['followers'];

        newState['followers'] = {};

        if (followers) {
          followers.forEach(follower => {
            newState['followers'][follower.id] = follower;
          })
        }

        return newState;
      } else if (action.list['followed']) {
        const followed = action.list['followed'];

        newState['followed'] = {};

        if (followed) {
          followed.forEach(followed => {
            newState[followed.id] = followed;
          })
        }

        return newState;
      }
    case FOLLOW:
      newState = { ...state };

      if (!newState['followed']) {
        newState['followed'] = {};
      }

      newState['followed'][action.user.id] = action.user;

      return newState;
    case UNFOLLOW:
      newState = { ...state };

      delete newState['followed'][action.user.id];

      return newState;
    default:
      return state;
  }
}

export default followersReducer;
