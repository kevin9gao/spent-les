import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPlanForm from "./EditPlanForm";

const EditPlanModal = ({ plan }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="edit-plan-btn"
        onClick={() => setShowModal(true)}>Edit Plan
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlanForm plan={plan} setShowModal={setShowModal} />
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  )
}

export default EditPlanModal;
