import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deletePlan } from "../../store/plans";

const DeletePlanModal = ({ plan }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDeletePlan = async e => {
    e.preventDefault();
    console.log('handleDeletePlan');
    dispatch(deletePlan(plan.id));
  }

  return (
    <>
      <button
        className="create-plan-btn"
        onClick={() => setShowModal(true)}>Delete Plan
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>{`Are you sure you want to delete plan: '${plan.plan_name}'?`}</h1>
          <button
            id="delete-plan-btn"
            onClick={handleDeletePlan}
            >Yes, delete my plan.</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default DeletePlanModal;
