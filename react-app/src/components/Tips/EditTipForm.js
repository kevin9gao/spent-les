import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTip } from "../../store/tips";

const EditTipForm = ({ tip, setShowModal, setTipChanged }) => {
  const dispatch = useDispatch();
  const [tipInput, setTipInput] = useState(tip.tip_body);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);

  useEffect(() => {
    const errors = [];

    if (!tipInput.length) {
      errors.push('Tip body must not be empty.');
    } else if (tipInput.length > 1000) {
      errors.push('Tip message cannot be more than 1000 characters long.');
    }

    setValidationErrors(errors);
  }, [tipInput]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validationErrors.length) {
      const payload = {
        user_id: tip.user_id,
        plan_id: tip.plan_id,
        tip_body: tipInput
      };

      await dispatch(editTip(tip.id, payload));
      setTipInput('');
      setTipChanged(true);
      setShowModal(false);
    } else setHideErrors(false);
  }

  return (
    <div className="edit-tip-container">
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
        id="edit-tip-form"
        onSubmit={handleSubmit}
      >
        <input
          value={tipInput}
          onChange={e => setTipInput(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditTipForm;
