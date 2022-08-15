import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { deletePlan, getSinglePlan } from "../../store/plans";

const DeletePlanModal = ({ plan }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { userId, date } = useParams();
  const year = date.slice(0, 4);
  const month = date.slice(5);

  useEffect(() => {
    dispatch(getSinglePlan(user.id, year, month));
  }, [showModal])

  const handleDeletePlan = async e => {
    e.preventDefault();
    const planDeleted = await dispatch(deletePlan(plan.id));
    // console.log('planDeleted', planDeleted);
    if (planDeleted) {
      setShowModal(false);
      // const newDate = planDeleted.month === 1 ?
      //                 `${planDeleted.year-1}-12` :
      //                 `${planDeleted.year}-${planDeleted.month-1}`;
    };
  }

  return (
    <>
      <button
        className="delete-btn"
        onClick={() => setShowModal(true)}>
          Delete Plan
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h4>{`Are you sure you want to delete your plan:`}</h4>
          <h2>{`'${plan.plan_name}'?`}</h2>
          <button
            className="delete-btn"
            id="delete-plan-btn"
            onClick={handleDeletePlan}
            >Yes, delete my plan.
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default DeletePlanModal;
