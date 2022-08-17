import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import EditSpendingForm from "./EditSpendingForm";

const EditSpendingModal = ({ spending }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="edit-spending-btn"
        onClick={() => setShowModal(true)}>Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpendingForm spending={spending} />
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default EditSpendingModal;
