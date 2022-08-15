import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlan, getUserPlans } from "../../store/plans";
import { getSpendings } from "../../store/spendings";
import './SpendingsBreakdown.css';

const SpendingsBreakdown = ({ isWidget = false, widgetMonth }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [planId, setPlanId] = useState('');
  const [monthSelected, setMonthSelected] = useState(false);
  // console.log('monthSelected', monthSelected);

  const today = moment();
  const todayString = `${today.year()}-${today.month() + 1 < 10 ?
    `0${today.month() + 1}` :
    today.month() + 1}`;
  const [month, setMonth] = useState(isWidget ? widgetMonth : todayString);
  const currYear = month.slice(0, 4);
  const currMonth = month.slice(5, 7);
  // console.log('month', month)

  const plansObj = useSelector(state => state.plans['user-plans']);
  const plans = plansObj ? Object.values(plansObj) : null;
  // console.log('plans',plans)

  const selectedPlan = plans?.filter(plan => {
    return (plan.month === Number(currMonth)) && (plan.year === Number(currYear));
  })[0];
  // console.log('selectedPlan', selectedPlan);


  const spendingsObj = useSelector(state => state.spendings);
  const allSpendings = spendingsObj ? Object.values(spendingsObj) : null;
  const spendings = allSpendings?.filter(spending => {
    const spendingDate = moment(spending.date);
    return month === `${spendingDate.year()}-${spendingDate.month() + 1 < 10 ?
                      `0${spendingDate.month() + 1}` :
                      spendingDate.month() + 1}`;
  })
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

  const changeMonth = e => {
    e.preventDefault();

    setMonth(e.target.value);
    setMonthSelected(true);
  }

  const moneySpent = spendings ? spendings.reduce((accum, current) => {
    return accum + Number(current.amount);
  }, 0).toFixed(2) : 0;
  // console.log('moneySpent', moneySpent);

  // console.log('month', month);
  // console.log('month', `${today.year()}-${today.month() + 1 < 10 ?
  //                       `0${today.month() + 1}` :
  //                       today.month() + 1}`);
  // console.log('month === todayString', month === todayString)

  const isThisMonth = month === todayString;
  let cashFlow;
  let totalMonthlyIncome;
  const monthlyIncome = Number(user.annual_income) / 12;
  const daysInMonth = moment([currYear, 0, 31]).month(Number(currMonth) - 1).date();
  // console.log('Number(currMonth) - 1', Number(currMonth) - 1);
  // console.log('daysInMonth', daysInMonth);
  if (!isThisMonth) {
    totalMonthlyIncome = monthlyIncome + Number(selectedPlan?.additional_income);
    console.log('selectedPlan', selectedPlan);
    console.log('monthlyIncome', monthlyIncome);
    console.log('totalMonthlyIncome', totalMonthlyIncome);
    console.log('moneySpent', moneySpent);
    cashFlow = totalMonthlyIncome - moneySpent;
    console.log('cashFlow', cashFlow);
  } else {
    const currDate = today.date();
    const portionOfMonth = currDate / daysInMonth;
    totalMonthlyIncome = monthlyIncome * portionOfMonth + Number(selectedPlan?.additional_income);
    cashFlow = totalMonthlyIncome - moneySpent;
  }

  let breakdownOverview = (
    <div className="breakdown-overview">
      <div className="breakdown-row">
        <span className="breakdown-name">Additional Income</span>
        <span className="breakdown-value">{`$${selectedPlan?.additional_income}`}</span>
      </div>
      <div className="breakdown-row">
        <span className="breakdown-name">Money Spent</span>
        <span className="breakdown-value">{`$${moneySpent && moneySpent}`}</span>
      </div>
      <div className="breakdown-row">
        <span className="breakdown-name">Monthly Income</span>
        <span className="breakdown-value">{`$${monthlyIncome.toFixed(2)}`}</span>
      </div>
      {isThisMonth && (
        <div className="breakdown-row">
          <span className="breakdown-name">{'Monthly Income (up to today)'}</span>
          <span className="breakdown-value">{`$${totalMonthlyIncome.toFixed(2)}`}</span>
        </div>
      )}
      {isThisMonth && (
        <div className="breakdown-row">
          <span className="breakdown-name">{'Cash Flow (up to today)'}</span>
          <span className="breakdown-value">{`$${cashFlow.toFixed(2)}`}</span>
        </div>
      )}
      {!isThisMonth && (
        <div className="breakdown-row">
          <span className="breakdown-name">Cash Flow</span>
          <span className="breakdown-value">{`$${cashFlow.toFixed(2)}`}</span>
        </div>
      )}
    </div>
  );

  if (isWidget) {
    return (
      <div className="breakdowns-container widget">
        <div className="breakdown-info">
          <h3 id="breakdown-overview-header">{selectedPlan?.plan_name}</h3>
          {breakdownOverview}
        </div>
      </div>
    );
  }

  if (!monthSelected) {
    return (
      <div className="breakdowns-container">
        <div id="month-selector-container">
          <div id="month-selector">
            <select onChange={changeMonth}>
              <option value='' disabled selected>Select a month...</option>
              {options?.map(opt => (
                <option
                  value={opt.value}
                  key={opt.label}
                >{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="breakdown-info no-month-selected">
          <h2>Please select a month.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="breakdowns-container">
      <div id="month-selector-container">
        <div id="month-selector">
          <select onChange={changeMonth}>
            <option value='' disabled selected>Select a month...</option>
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
        <h3 id="breakdown-overview-header">Overview</h3>
        {breakdownOverview}
      </div>
    </div>
  );
}

export default SpendingsBreakdown;
