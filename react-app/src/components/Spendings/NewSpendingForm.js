import React, { useState } from "react";
import { useSelector } from "react-redux";

const NewSpendingForm = ({ date }) => {
  const [nameInput, setNameInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [amountInput, setAmountInput] = useState();
  const plan = useSelector(state => state.plans.current);

  const handleNewSpending = e => {
    e.preventDefault();

    const payload = {
      plan_id: plan.id,
      transaction_name: nameInput,
      transaction_notes: notesInput,
      amount: amountInput,
      date: date
    }
  }

  return (
    <div className="new-spending-form-container">
      <div className="spending-form-container">
        <form
          className="spending-form"
          onSubmit={handleNewSpending}
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
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default NewSpendingForm;
