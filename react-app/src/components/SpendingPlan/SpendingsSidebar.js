import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePlan } from "../../store/plans";
import { getSpendings } from "../../store/spendings";
import NewSpendingForm from "../Spendings/NewSpendingForm";
import SpendingsList from "../Spendings/SpendingsList";
import './SpendingsSidebar.css';

const SpendingsSidebar = ({ date, isOwner = true, userId }) => {
  const dispatch = useDispatch();
  const [hideNewSpendingForm, setHideNewSpendingForm] = useState(true);
  const plan = useSelector(state => state.plans.current);
  // console.log('userId sidebar', userId)
  const [user, setUser] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users/${userId}`);
      const sidebarUser = await res.json();
      setUser(sidebarUser);
    })();
  }, [userId]);
  // console.log('user state var', user);

  useEffect(() => {
    dispatch(getSpendings(plan?.id));
  }, [dispatch]);

  useEffect(() => {
    setHideNewSpendingForm(true);
  }, [date]);

  // console.log('SpendingsSidebar date', date);

  return (
    <div className="sidebar-container">
      <div className="existing-spendings">
        <h2>{`${user?.username}'s Spendings - ${date}`}</h2>
        <div id="sidebar-spendings-container">
          <SpendingsList date={date} />
        </div>
      </div>
      {isOwner &&
        (<div id="sidebar-new-spending-container">
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
      )}
    </div>
  );
}

export default SpendingsSidebar;
