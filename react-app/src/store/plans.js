const LOAD = 'plans/LOAD';
const ADD = 'plans/ADD';
const UPDATE = 'plans/UPDATE';
const REMOVE = 'plans/REMOVE';

const load = list => ({
  type: LOAD,
  list
})

const add = plan => ({
  type: ADD,
  plan
})

const update = plan => ({
  type: UPDATE,
  plan
})

const remove = planId => ({
  type: REMOVE,
  planId
})

export const getPlans = () => async dispatch => {
  const res = await fetch('/api/plans');

  if (res.ok) {
    const list = await res.json();
    await dispatch(load(list));
    return list;
  }
}

export const getSinglePlan = (userId, year, month) => async dispatch => {
  console.log('getSinglePlan, year, month', year, month);
  const res = await fetch(`/api/plans/users/${userId}/plan/${year}-${month}`);
  console.log('getSinglePlan res', res);

  if (res.ok) {
    const list = await res.json();
    console.log('getSinglePlan list', list);
    await dispatch(load(list));
    return list;
  } else {
    const list = {};
    await dispatch(load(list));
    return list;
  }
}

export const getUserPlans = userId => async dispatch => {
  const res = await fetch(`/api/plans/users/${userId}`);

  if (res.ok) {
    const list = await res.json();
    await dispatch(load(list));
    return list;
  }
}

export const getAnotherUsersPlans = userId => async dispatch => {
  const res = await fetch(`/api/plans/users/${userId}`);

  if (res.ok) {
    const list = await res.json();
    console.log('getanotherusersplans list', list);
    await dispatch(load({'other-users-plans': list}));
    return list;
  }
}

export const createPlan = payload => async dispatch => {
  console.log('createPlan payload', payload);

  const res = await fetch(`/api/plans/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  console.log('createPlan res', res);

  if (res.ok) {
    const plan = await res.json();
    await dispatch(add(plan));
    return plan;
  }
}

export const editPlan = (userId, year, month, payload) => async dispatch => {
  const res = await fetch(`/api/plans/users/${userId}/plan/${year}-${month}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const plan = await res.json();
    await dispatch(update(plan));
    return plan;
  }
}

export const deletePlan = planId => async dispatch => {
  const res = await fetch(`/api/plans/${planId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const plan = await res.json();
    await dispatch(remove(planId));
    return plan;
  }
}

let newState;
// true deep copy json.parse(json.stringify(state))

const plansReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      if (action.list['plans']) {
        const plans = action.list['plans'];
        plans.forEach(plan => {
          newState[plan.id] = plan;
        })
      } else if (action.list['user_plans']) {
        const userPlans = action.list['user_plans'];
        newState['user-plans'] = {};
        userPlans.forEach(plan => {
          newState['user-plans'][plan.id] = plan;
        })
      } else if (action.list['other-users-plans']) {
        const otherUsersPlans = action.list['other-users-plans']['user_plans'];
        newState['other-users-plans'] = {};
        otherUsersPlans.forEach(plan => {
          newState['other-users-plans'][plan.id] = plan;
        })
      } else {
        newState['current'] = action.list
      }
      return newState;
    case ADD:
      newState = {...state};
      newState[action.plan.id] = action.plan;
      return newState;
    case UPDATE:
      newState = {...state};
      newState[action.plan.id] = action.plan;
      newState['user-plans'][action.plan.id] = action.plan;
      return newState;
    case REMOVE:
      newState = {...state};
      delete newState[action.planId];
      delete newState['user-plans'][action.planId];
      delete newState['current'];
    default:
      return state;
  }
};

export default plansReducer
