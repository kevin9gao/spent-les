const LOAD = 'spendings/LOAD';
const ADD = 'spendings/ADD';
const UPDATE = 'spendings/UPDATE';
const REMOVE = 'spendings/REMOVE';

const load = list => ({
  type: LOAD,
  list
})

const add = spending => ({
  type: ADD,
  spending
})

const update = spending => ({
  type: UPDATE,
  spending
})

const remove = spendingId => ({
  type: REMOVE,
  spendingId
})

export const getSpendings = planId => async dispatch => {
  const res = await fetch(`/api/spendings/plan/${planId}`);

  console.log('getSpendings planId', planId);
  console.log('getSpendings res', res);

  if (res.ok) {
    const list = await res.json();
    await dispatch(load(list));
    return list;
  }
}

export const createSpending = payload => async dispatch => {
  // console.log('createSpending thunk');

  const res = await fetch('/api/spendings/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // console.log('createSpending res', res);

  if (res.ok) {
    const spending = await res.json();
    await dispatch(add(spending));
    return spending;
  }
}

export const editSpending = (spendingId, payload) => async dispatch => {
  const res = await fetch(`/api/spendings/${spendingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const spending = await res.json();
    await dispatch(update(spending));
    return spending;
  }
}

export const deleteSpending = spendingId => async dispatch => {
  const res = await fetch(`/api/spendings/${spendingId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    await dispatch(remove(spendingId));
  }
}

let newState;

const spendingsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      newState = {};

      const spendings = action.list['spendings'];

      spendings.forEach(spending => {
        newState[spending.id] = spending;
      });

      return newState;
    case ADD:
      newState = { ...state };
      newState[action.spending.id] = action.spending;
      return newState;
    case UPDATE:
      newState = { ...state };
      newState[action.spending.id] = action.spending;
      return newState;
    case REMOVE:
      newState = { ...state };
      delete newState[action.spendingId];
      return newState;
    default:
      return state;
  }
}

export default spendingsReducer;
