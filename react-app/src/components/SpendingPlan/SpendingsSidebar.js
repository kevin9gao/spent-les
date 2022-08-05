import React, { useEffect, useState } from "react";
import './SpendingsSidebar.css';

const SpendingsSidebar = ({ date }) => {
  const [hideNewSpendingForm, setHideNewSpendingForm] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [amountInput, setAmountInput] = useState();

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
        <form
          id="new-spending-form"
          hidden={hideNewSpendingForm}
        >
          <label>Spending Name</label>
          <input
            placeholder="What kind of transaction was this?"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
          />
          <label>Notes</label>
          <input
            placeholder="Notes regarding the spending..."
            value={notesInput}
            onChange={e => setNotesInput(e.target.value)}
          />
          <label>Amount</label>
          <input
            placeholder="Spending amount..."
            value={amountInput}
            onChange={e => setAmountInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default SpendingsSidebar;
