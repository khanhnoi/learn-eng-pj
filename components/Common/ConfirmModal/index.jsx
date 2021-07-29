import React, { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';

const ConfirmModal = ({
  isOpen,
  onClose,
  onAccept,
  title,
  description,
  acceptButton,
  declineButton,
  warningText
}) => {
  const [closeModal, setCloseModal] = useState(false);
  const handleCloseModal = () => {
    setCloseModal(false);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <Modal
          contentClassName={styles.confirmModal}
          onCloseModal={handleCloseModal}
          closeModal={closeModal}
        >
          <div>
            <h4 className={styles.modalTitle}>{title}</h4>
            <p className="text-is-14 has-margin-bottom-5 has-text-weight-500">
              {description}
            </p>
            <div className="has-margin-top-4 has-margin-bottom-4"></div>
            <div className="has-margin-bottom-5 has-margin-top-4">
              <Button onClick={onAccept} size="medium" className={styles.btnOk}>
                {acceptButton}
              </Button>
              <Button
                onClick={() => {
                  setCloseModal(true);
                }}
                containerClassName={styles.btnCancel}
                className={styles.button}
                outlineGradient
                size="medium"
              >
                {declineButton}
              </Button>
            </div>

            <p
              className={cn('text-is-14 has-margin-top-4', styles.textWarning)}
            >
              {warningText}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
