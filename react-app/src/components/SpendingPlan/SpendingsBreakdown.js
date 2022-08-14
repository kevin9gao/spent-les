import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlan, getUserPlans } from "../../store/plans";
import { getSpendings } from "../../store/spendings";

const SpendingsBreakdown = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [planId, setPlanId] = useState('');

  const today = moment();
  const [month, setMonth] = useState(`${today.year()}-${today.month() + 1 < 10 ?
                                                        `0${today.month()}` :
                                                        today.month() + 1}`);
  const currYear = month.slice(0, 4);
  const currMonth = month.slice(5, 7);
  // console.log('month', month)

  const plansObj = useSelector(state => state.plans['user-plans']);
  const plans = plansObj ? Object.values(plansObj) : null;
  // console.log('plans',plans)

  const selectedPlan = useSelector(state => state.plans['current']);
  // console.log('selectedPlan', selectedPlan);

  useEffect(() => {
    dispatch(getUserPlans(user.id));
  }, [dispatch]);

  useEffect(async () => {
    const foundPlan = await dispatch(getSinglePlan(user.id, currYear, currMonth));
    setPlanId(foundPlan.id);
  }, [month]);

  // console.log('planId', planId);

  useEffect(() => {
    dispatch(getSpendings(planId));
  }, [planId]);

  const options = plans?.map(plan => {
    return {
      value: `${plan.year}-${plan.month < 10 ? `0${plan.month}` : plan.month}`,
      label: plan.plan_name
    };
  });

  const changeMonth = e => {
    e.preventDefault();

    setMonth(e.target.value);
  }

  return (
    <div className="breakdowns-container">
      <div id="month-selector-container">
        <div id="month-selector">
          <select onChange={changeMonth}>
            {options?.map(opt => (
              <option
                value={opt.value}
                key={opt.label}
              >{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SpendingsBreakdown;
