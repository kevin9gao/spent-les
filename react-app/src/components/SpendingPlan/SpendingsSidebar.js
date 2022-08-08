import React, { useEffect, useState } from "react";
import NewSpendingForm from "../Spendings/NewSpendingForm";
import './SpendingsSidebar.css';

const SpendingsSidebar = ({ date }) => {
  const [hideNewSpendingForm, setHideNewSpendingForm] = useState(true);


  useEffect(() => {
    setHideNewSpendingForm(true);
  }, [date]);

  return (
    <div className="sidebar-container">
      <h2>{`User Spendings - ${date}`}</h2>
      <div id="sidebar-spendings-container">
        <h3>Spendings</h3>
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
          <NewSpendingForm date={date} />
        </div>
      </div>
    </div>
  );
}

export default SpendingsSidebar;
