import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import EditProfileForm from "./EditProfileForm";

const EditProfileModal = ({ user, showModal, setShowModal }) => {
  // console.log('EditProfileModal showModal', showModal);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfileForm user={user} setShowModal={setShowModal} />
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default EditProfileModal;
