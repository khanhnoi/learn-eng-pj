import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import moment from 'moment';

const ConfirmModal = ({
  isOpen,
  onClose,
  onOk,
  title,
  description,
  warningType,
  battleType,
  endTime
}) => {
  return (
    <>
      {isOpen && (
        <Modal contentClassName={styles.confirmModal} onCloseModal={onClose}>
          <div>
            <h4 className={styles.modalTitle}>{title}</h4>
            <p className="text-is-14 has-margin-bottom-5 has-text-weight-500">
              {description}
            </p>
            <div className="has-margin-top-4 has-margin-bottom-4"></div>
            <div className="has-margin-bottom-5 has-margin-top-4">
              <Button onClick={onOk} size="medium" className={styles.btnOk}>
                HOÀN THÀNH
              </Button>
              <Button
                onClick={onClose}
                containerClassName={styles.btnCancel}
                className={styles.button}
                outlineGradient
                size="medium"
              >
                QUAY LẠI
              </Button>
            </div>

            <p
              className={cn('text-is-14 has-margin-top-4', styles.textWarning)}
            >
              {battleType === 'freedom' ? (
                <>
                  * Bạn sẽ nhận được thông báo kết quả khi trận đấu kết thúc vào
                  lúc {moment(endTime).format('HH:mm - DD/MM/YYYY')}. Bạn nhớ
                  kiểm tra thông báo nhé!
                </>
              ) : battleType === 'realtime' ? (
                <>
                  * Bạn sẽ xem được kết quả khi tất cả đối thủ hoàn thành trận
                  đấu hoặc muộn nhất vào lúc{' '}
                  {moment(endTime).format('HH:mm - DD/MM/YYYY')}. Bạn đợi thêm
                  một chút nữa nhé!
                </>
              ) : warningType === 'competition' ? (
                <>
                  * Bạn sẽ xem được kết quả khi tất cả đối thủ hoàn thành cuộc
                  thách đấu hoặc muộn nhất vào lúc{' '}
                  {moment(endTime).format('HH:mm - DD/MM/YYYY')}. Bạn đợi thêm
                  một chút nữa nhé!
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
