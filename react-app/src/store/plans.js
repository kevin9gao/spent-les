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

export const getSinglePlan = planId => async dispatch => {
  const res = await fetch(`/api/plans/${planId}`);

  if (res.ok) {
    const list = await res.json();
    await dispatch(load(list));
    return list;
  }
}

let newState;

const plansReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      newState = {...state};
      if (action.list['plans']) {
        const plans = action.list['plans'];
        plans.forEach(plan => {
          newState[plan.id] = plan;
        })
      } else {
        newState['current'] = action.list
      }
      return newState;
    default:
      return state;
  }
};

export default plansReducer
