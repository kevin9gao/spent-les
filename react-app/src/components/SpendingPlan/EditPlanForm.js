import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPlan, getSinglePlan } from "../../store/plans";
import './PlanForm.css';

const EditPlanForm = ({ plan, setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [planName, setPlanName] = useState(plan.plan_name);
  const [priv, setPriv] = useState(plan.private);
  const [additionalIncome, setAdditionalIncome] = useState(plan.additional_income);
  const [addIncNotes, setAddIncNotes] = useState(plan.additional_income_notes);
  const [notes, setNotes] = useState(plan.notes);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);


  useEffect(() => {
    const errors = [];

    if (planName.length === 0) {
      errors.push('Please include a name for the spending plan.');
    }

    if (additionalIncome.length) {
      if (!Number(additionalIncome)) {
        errors.push('Additional income provided must be a number.');
      }
    }

    setValidationErrors(errors);
  }, [planName, additionalIncome]);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      user_id: user.id,
      plan_name: planName,
      month: plan.month,
      year: plan.year,
      private: priv,
      additional_income: additionalIncome.length ? additionalIncome : 0,
      additional_income_notes: addIncNotes,
      notes
    }
    console.log('EditPlanForm payload', payload);

    if (validationErrors.length === 0) {
      const editedPlan = await dispatch(editPlan(user.id, plan.year, plan.month, payload));;
      // console.log('editedPlan', editedPlan);
      await dispatch(getSinglePlan(user.id, plan.year, plan.month));
      setShowModal(false);
    } else setHideErrors(false);
  }

  return (
    <div className="edit-plan-container">
      <div id="edit-plan-form-container">
        <h2>Edit Your Plan!</h2>
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
          className="plan-form"
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
          />
          <label>Notes On Additional Income</label>
          <input
            value={addIncNotes}
            onChange={e => setAddIncNotes(e.target.value)}
            placeholder='Add notes on additional income...'
          />
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder='Any notes about this month...'
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

export default EditPlanForm;
