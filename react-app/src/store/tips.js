const LOAD = 'tips/LOAD';
const ADD = 'tips/ADD';
const UPDATE = 'tips/UPDATE';
const REMOVE = 'tips/REMOVE';

const load = list => ({
  type: LOAD,
  list
});

const add = tip => ({
  type: ADD,
  tip
});

const update = tip => ({
  type: UPDATE,
  tip
});

const remove = tipId => ({
  type: REMOVE,
  tipId
});

export const loadTips = planId => async dispatch => {
  const res = await fetch(`/api/tips/plans/${planId}`);

  if (res.ok) {
    const list = await res.json();
    await dispatch(load(list));
    return list;
  }
}

export const createTip = payload => async dispatch => {
  const res = await fetch('/api/tips/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const tip = await res.json();
    await dispatch(add(tip));
    return tip;
  }
}

export const editTip = (tipId, payload) => async dispatch => {
  const res = await fetch(`/api/tips/${tipId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const tip = await res.json();
    await dispatch(update(tip));
    return tip;
  }
}

export const deleteTip = (tipId) => async dispatch => {
  const res = await fetch(`/api/tips/${tipId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    await dispatch(remove(tipId));
  }
}

let newState;

const tipsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      newState = {};
      const tips = action.list['tips'];
      tips.forEach(tip => {
        newState[tip.id] = tip;
      })
      return newState;
    case ADD:
      newState = { ...state };
      newState[action.tip.id] = action.tip;
      return newState;
    case UPDATE:
      newState = { ...state };
      newState[action.tip.id] = action.tip;
      return newState;
    case REMOVE:
      newState = { ...state };
      delete newState[action.tipId];
      return newState;
    default:
      return state;
  }
}

export default tipsReducer;
