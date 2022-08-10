import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { deleteTip } from "../../store/tips";

const DeleteTipModal = ({ tip }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteTip = async e => {
    e.preventDefault();
    const tipDeleted = await dispatch(deleteTip(tip.id));
    if (tipDeleted) {
      setShowModal(false);
    }
  }

  return (
    <div className="delete-tip-modal-container">
      <button
        className="delete-tip-btn"
        onClick={() => setShowModal(true)}>
          Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Are you sure you would like to delete your tip?</h1>
          <button
            id="delete-tip-btn"
            onClick={handleDeleteTip}
            >Yes, delete this tip.
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
}

export default DeleteTipModal;
