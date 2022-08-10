import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTip } from "../../store/tips";

const NewTipForm = ({ plan, setTipChanged }) => {
  const dispatch = useDispatch();
  const [tipInput, setTipInput] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const user = useSelector(state => state.session.user);

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
        user_id: user.id,
        plan_id: plan?.id,
        tip_body: tipInput
      };

      await dispatch(createTip(payload));
      setTipInput('');
      setTipChanged(true);
    } else setHideErrors(false);
  }

  return (
    <div className="new-tip-container">
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
        id="new-tip-form"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Leave a tip..."
          value={tipInput}
          onChange={e => setTipInput(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewTipForm;
