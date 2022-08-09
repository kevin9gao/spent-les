import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpendings } from "../../store/spendings";
import NewSpendingForm from "../Spendings/NewSpendingForm";
import SpendingsList from "../Spendings/SpendingsList";
import './SpendingsSidebar.css';

const SpendingsSidebar = ({ date }) => {
  const dispatch = useDispatch();
  const [hideNewSpendingForm, setHideNewSpendingForm] = useState(true);
  const plan = useSelector(state => state.plans.current);

  useEffect(() => {
    dispatch(getSpendings(plan.id));
  }, [dispatch]);

  useEffect(() => {
    setHideNewSpendingForm(true);
  }, [date]);

  return (
    <div className="sidebar-container">
      <h2>{`User Spendings - ${date}`}</h2>
      <div id="sidebar-spendings-container">
        <SpendingsList date={date} />
      </div>
      <div id="sidebar-new-spending-container">
        <button
          onClick={() => setHideNewSpendingForm(false)}
          hidden={!hideNewSpendingForm}
        >
          New Spending
        </button>
        <div
          id="new-spending-container"
          hidden={hideNewSpendingForm}
        >
          <NewSpendingForm date={date} setHideNewSpendingForm={setHideNewSpendingForm} />
        </div>
      </div>
    </div>
  );
}

export default SpendingsSidebar;
