import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditTipForm from "./EditTipForm";

const EditTipModal = ({ tip, setTipChanged }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="modal">
      <button
        className="edit-tip-btn"
        onClick={() => setShowModal(true)}>Edit Tip
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditTipForm tip={tip} setShowModal={setShowModal} setTipChanged={setTipChanged} />
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  )
}

export default EditTipModal;
