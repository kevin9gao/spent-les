import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AboutPage from './AboutPage';
import './About.css';

function AboutModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        id='about-button'
      >About</button>
      {showModal && (
        <Modal className='about modals' onClose={() => setShowModal(false)}>
          <AboutPage />
        </Modal>
      )}
    </>
  );
}

export default AboutModal;
