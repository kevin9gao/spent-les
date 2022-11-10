const LOAD = 'feed/LOAD';

const load = list => ({
  type: LOAD,
  list
})

export const loadFeed = () => async dispatch => {
  const res = await fetch('/api/spendings');

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

      spendings.forEach(spending => {
        newState[spending.id] = spending;
      });

      return newState;
    default:
      return state;
  }
}

export default feedReducer;
