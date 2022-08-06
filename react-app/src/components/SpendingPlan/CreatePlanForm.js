import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlan } from "../../store/plans";
import './CreatePlanForm.css';

const CreatePlanForm = ({ month, year, MONTHS }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [planName, setPlanName] = useState(`${user.username} - ${MONTHS[month]} ${year}`);
  const [priv, setPriv] = useState(false);
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [addIncNotes, setAddIncNotes] = useState('');
  const [notes, setNotes] = useState('');

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

    const newPlan = await dispatch(createPlan(payload));
    history.push(`/users/${user.id}/calendar`);
  }

  return (
    <div className="create-plan-container">
      <div id="create-plan-form-container">
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
