import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import CreatePlanForm from "./CreatePlanForm";

const CreatePlanModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="create-plan-btn"
        onClick={() => setShowModal(true)}>Create A New Plan
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePlanForm />
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default CreatePlanModal;
