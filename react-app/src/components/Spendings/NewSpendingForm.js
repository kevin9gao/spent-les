import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpending } from "../../store/spendings";

const NewSpendingForm = ({ date, setHideNewSpendingForm }) => {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const plan = useSelector(state => state.plans.current);
  const user = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);

  // console.log('NewSpendingForm date', date);
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));

  useEffect(() => {
    const errors = [];

    if (nameInput.length === 0) {
      errors.push('Spending must have a name.');
    } else if (nameInput.length > 50) {
      errors.push('Spending name cannot be longer than 50 characters.');
    }

    if (notesInput.length > 500) {
      errors.push('Spending notes can only be a maximum of 500 characters.');
    }

    if (amountInput.length === 0) {
      errors.push('Spending must have an amount.');
    } else if (!Number(amountInput)) {
      errors.push('Spending amount must be a number.');
    } else if (Number(amountInput) > 99999999.99) {
      errors.push('Support for billionaires incoming...');
    }

    setValidationErrors(errors);
  }, [nameInput, notesInput, amountInput]);

  const handleNewSpending = async e => {
    e.preventDefault();

    const payload = {
      plan_id: plan.id,
      transaction_name: nameInput,
      transaction_notes: notesInput.length ? notesInput : null,
      amount: amountInput,
      date,
      month,
      year,
      day,
      user_id: user.id,
    }

    // console.log('NewSpendingForm payload', payload);

    if (!validationErrors.length) {
      const newSpending = await dispatch(createSpending(payload));
      // console.log('newSpending', newSpending)
      setHideNewSpendingForm(true);
      setNameInput('');
      setNotesInput('');
      setAmountInput('');
    } else setHideErrors(false);
  }

  return (
    <div className="new-spending-form-container">
      <div className="spending-form-container">
        <div
          className="errors"
          hidden={hideErrors}
        >
          <ul>
            {validationErrors && validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
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
          <div className="submit">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewSpendingForm;
