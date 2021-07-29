import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import { useState } from 'react';

const ConfirmModal = ({
  isOpen,
  onClose,
  onOk,
  title,
  text,
  acceptText,
  cancelText
}) => {
  const [closeModal, setCloseModal] = useState(false);
  useEffect(() => {
    setCloseModal(false);
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <Modal
          contentClassName={styles.confirmModal}
          onCloseModal={onClose}
          closeModal={closeModal}
        >
          <div>
            <h4 className={styles.modalTitle}>{title}</h4>
            <p className="text-is-14 has-margin-bottom-5 has-text-weight-500">
              {text}
            </p>
            <div className="has-margin-top-4 has-margin-bottom-4"></div>
            <div className="has-margin-bottom-4 has-margin-top-4">
              <Button onClick={onOk} size="medium" className={styles.btnOk}>
                {acceptText}
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
                {cancelText}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
