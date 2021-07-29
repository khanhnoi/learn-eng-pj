import React from 'react';
import Modal from '../../Common/Modal';
import styles from './styles.module.scss';
import Button from '../../Common/Button';
import Router from 'next/router';
import { User } from '../../../hooks/useUser';
import { Notification } from '../../../hooks/useNotification';
import { useState } from 'react';
import { useEffect } from 'react';

const withNotificationModal = (Component) => (props) => {
  const onOk = () => {
    Router.push(navigateLink);
  };

  const onClose = () => {
    setCloseModal(true);
  };

  const { notifications, markNotificationAsRead } = Notification.useContainer();
  const { user } = User.useContainer();
  const [closeModal, setCloseModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [navigateLink, setNavigateLink] = useState('');
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    const newestNotification = notifications[0];
    if (!newestNotification) return;
    const isRead = newestNotification.isRead;
    const notificationType = newestNotification.action?.type;

    if (!isRead && notificationType === 'navigate') {
      setOpenModal(true);
      setNotificationType(newestNotification.icon);
      setNavigateLink(`/${newestNotification.action?.value}`);
      markNotificationAsRead(user.id, newestNotification.id);
    }
  }, [notifications]);

  return (
    <>
      {openModal && (
        <Modal
          contentClassName={styles.confirmModal}
          closeModal={closeModal}
          onCloseModal={() => {
            setOpenModal(false);
          }}
        >
          <h4 className={styles.modalTitle}>
            {notificationType === 'competition'
              ? 'XEM KẾT QUẢ CUỘC THÁCH ĐẤU'
              : 'XEM KẾT QUẢ TRẬN ĐẤU'}
          </h4>
          <p className="text-is-14 has-text-weight-500">
            {notificationType === 'competition'
              ? 'Cuộc thách đấu '
              : 'Trận đấu '}
            mà bạn tham gia vừa kết thúc, bạn có muốn xem kết quả chung cuộc để
            kiểm tra thành tích của mình và bạn bè?
          </p>
          <div className="has-margin-top-4 has-margin-bottom-4">
            <Button onClick={onOk} size="medium" className={styles.btnOk}>
              XEM KẾT QUẢ
            </Button>
            <Button
              onClick={onClose}
              containerClassName={styles.btnCancel}
              className={styles.button}
              outlineGradient
              size="medium"
            >
              BỎ QUA
            </Button>
          </div>
        </Modal>
      )}
      <Component {...props} />
    </>
  );
};

export default withNotificationModal;
