import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editSpending } from "../../store/spendings";
import moment from 'moment';

const EditSpendingForm = ({ spending, setShowModal }) => {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState(spending.transaction_name);
  const [notesInput, setNotesInput] = useState(spending.transaction_notes);
  const [amountInput, setAmountInput] = useState(spending.amount);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);


  useEffect(() => {
    const errors = [];

    if (nameInput.length === 0) {
      errors.push('Spending must have a name.');
    } else if (nameInput.length > 50) {
      errors.push('Spending name cannot be longer than 50 characters.');
    }

    if (notesInput) {
      if (notesInput.length > 500) {
        errors.push('Spending notes can only be a maximum of 500 characters.');
      }
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

  const handleEditSpending = async e => {
    e.preventDefault();

    const date = moment(spending.date);
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date() + 1;
    const dateStr = `${year}-${month < 10 ?
                              `0${month}` :
                              month}-${day < 10 ?
                                          `0${day}` :
                                          day}`;
    // console.log('year', year, 'month', month, 'day', day);


    const payload = {
      plan_id: spending.plan_id,
      transaction_name: nameInput,
      transaction_notes: notesInput ? notesInput : null,
      amount: Number(amountInput),
      date: dateStr,
      month,
      year,
      day
    }

    // console.log('EditSpendingForm payload', payload);

    if (!validationErrors.length) {
      const updatedSpending = await dispatch(editSpending(spending.id, payload));
      // console.log('updatedSpending', updatedSpending)
      setNameInput('');
      setNotesInput('');
      setAmountInput('');
      setShowModal(false);
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
          onSubmit={handleEditSpending}
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

export default EditSpendingForm;
