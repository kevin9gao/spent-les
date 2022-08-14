import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlan, getUserPlans } from "../../store/plans";
import { getSpendings } from "../../store/spendings";
import './SpendingsBreakdown.css';

const SpendingsBreakdown = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [planId, setPlanId] = useState('');

  const today = moment();
  const [month, setMonth] = useState(`${today.year()}-${today.month() + 1 < 10 ?
                                                        `0${today.month() + 1}` :
                                                        today.month() + 1}`);
  const currYear = month.slice(0, 4);
  const currMonth = month.slice(5, 7);
  // console.log('month', month)

  const plansObj = useSelector(state => state.plans['user-plans']);
  const plans = plansObj ? Object.values(plansObj) : null;
  // console.log('plans',plans)

  const selectedPlan = useSelector(state => state.plans['current']);
  // console.log('selectedPlan', selectedPlan);

  const spendingsObj = useSelector(state => state.spendings);
  const spendings = spendingsObj ? Object.values(spendingsObj) : null;
  // console.log('spendings', spendings);

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

  const moneySpent = spendings ? spendings.reduce((accum, current) => {
    return accum + Number(current.amount);
  }, 0) : null;
  // console.log('moneySpent', moneySpent);

  const changeMonth = e => {
    e.preventDefault();

    setMonth(e.target.value);
  }

  console.log('annual income', user.annual_income)

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
      <div className="breakdown-info">
        <div className="breakdown-overview">
          <h3>Overview</h3>
          <div className="breakdown-row">
            <span className="breakdown-name">Additional Income</span>
            <span className="breakdown-value">{selectedPlan?.additional_income}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-name">Money Spent</span>
            <span className="breakdown-value">{moneySpent && moneySpent}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-name">Monthly Income</span>
            <span className="breakdown-value">{Number(user.annual_income) / 12}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpendingsBreakdown;
