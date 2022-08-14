import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import CreatePlanForm from "./CreatePlanForm";
import './PlanForm.css';

const CreatePlanModal = ({ month, year, MONTHS }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="create-plan-btn"
        onClick={() => setShowModal(true)}>Create A New Plan
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePlanForm month={month} year={year} MONTHS={MONTHS} setShowModal={setShowModal} />
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default CreatePlanModal;
