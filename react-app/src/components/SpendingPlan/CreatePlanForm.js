import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlan, getSinglePlan } from "../../store/plans";
import './CreatePlanForm.css';

const CreatePlanForm = ({ month, year, MONTHS, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [planName, setPlanName] = useState(`${user.username} - ${MONTHS[month - 1]} ${year}`);
  const [priv, setPriv] = useState(false);
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [addIncNotes, setAddIncNotes] = useState('');
  const [notes, setNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);


  useEffect(() => {
    const errors = [];

    if (planName.length === 0) {
      errors.push('Please include a name for the spending plan.');
    }

    if(!Number(additionalIncome)) {
      errors.push('Additional income provided must be a number.');
    }

    setValidationErrors(errors);
  }, [planName, additionalIncome]);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      user_id: user.id,
      plan_name: planName,
      month,
      year,
      private: priv,
      additional_income: additionalIncome,
      additional_income_notes: addIncNotes,
      notes
    }
    console.log('CreatePlanForm payload', payload);

    if (validationErrors.length === 0) {
      const newPlan = await dispatch(createPlan(payload));
      // console.log('newPlan', newPlan);
      await dispatch(getSinglePlan(user.id, newPlan.year, newPlan.month));
      setShowModal(false);
      history.push(`/users/${user.id}/calendar/${newPlan.year}-${newPlan.month}`);
    } else setHideErrors(false);
  }

  return (
    <div className="create-plan-container">
      <div id="create-plan-form-container">
        <h2>Create a new plan!</h2>
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
          id="create-plan-form"
          onSubmit={handleSubmit}
        >
          <label>Spending Plan Name</label>
          <input
            value={planName}
            onChange={e => setPlanName(e.target.value)}
          />
          <label>Additional Income</label>
          <input
            value={additionalIncome}
            onChange={e => setAdditionalIncome(e.target.value)}
            placeholder='Any additional income you made this month?'
          />
          <label>Notes On Additional Income</label>
          <input
            value={addIncNotes}
            onChange={e => setAddIncNotes(e.target.value)}
            placeholder='What was your additional income from?'
          />
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder='Any additional remarks about this month?'
          />
          <label>Private:</label>
          <input
            type="checkbox"
            checked={priv}
            onChange={e => setPriv(!priv)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePlanForm;
