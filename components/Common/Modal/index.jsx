import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Modal = ({
  children,
  onCloseModal,
  contentClassName,
  closeModal,
  notAllowClose
}) => {
  const [close, setClose] = useState(false);

  useEffect(() => {
    const handleKeyPress = (evt) => {
      if (evt.keyCode === 27 && !notAllowClose) handleCloseModal();
    };

    document.addEventListener('keydown', handleKeyPress, false);
    document.documentElement.classList.add('is-clipped');

    // return function will be called on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
      document.documentElement.classList.remove('is-clipped');
    };
  }, []);

  const handleCloseModal = () => {
    setClose(true);
    setTimeout(() => {
      onCloseModal();
    }, 150);
  };

  useEffect(() => {
    if (closeModal) handleCloseModal();
  }, [closeModal]);

  return (
    <div
      className={cn('modal', styles.customModal, 'is-active', {
        [styles.close]: close
      })}
      role="button"
    >
      <div className="modal-background"></div>
      <div className={cn(styles.mainContent)}>
        <div
          className={cn('modal-content', styles.modalContent, contentClassName)}
        >
          {children}
        </div>
        {!notAllowClose && (
          <button
            className={cn('modal-close', styles.closeModal)}
            aria-label="close"
            onClick={handleCloseModal}
          ></button>
        )}
      </div>
    </div>
  );
};

export default Modal;
