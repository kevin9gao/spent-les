import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deleteSpending } from "../../store/spendings";
import '../SpendingPlan/SpendingsSidebar.css';

const DeleteSpendingModal = ({ spending }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = e => {
    e.preventDefault();

    dispatch(deleteSpending(spending.id));
  }

  return (
    <div id="delete-spending-modal">
      <button
        className="delete-btn"
        onClick={() => setShowModal(true)}>Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h4>Delete spending:</h4>
          <h3>{`'${spending.transaction_name}'?`}</h3>
          <div className="edit-delete">
            <button
              onClick={handleDelete}
              className='delete-btn'>Delete</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DeleteSpendingModal;
