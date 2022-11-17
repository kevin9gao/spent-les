const LOAD = 'feed/LOAD';

const load = list => ({
  type: LOAD,
  list
})

export const loadFeed = () => async dispatch => {
  console.log('got to loadFeed thunk');

  const res = await fetch('/api/spendings');

  console.log('loadFeed thunk res', res);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

let newState;

const feedReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      const spendings = action.list.spendings;

      console.log('feedReducer spendings', spendings);

      spendings.forEach(spending => {
        newState[spending.id] = spending;
      });

      return newState;
    default:
      return state;
  }
}

export default feedReducer;
