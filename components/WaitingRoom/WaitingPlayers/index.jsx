import React, { useState } from 'react';
import cn from 'classnames';
import _ from 'lodash';
import styles from './styles.module.scss';
import Button from '../../Common/Button';
import InviteUserCard from '../../Common/InviteUserCard';
import ConfirmModal from '../ConfirmModal';
import { User } from '../../../hooks/useUser';

/**
 * @param {string} title string (Wating room title)
 * @param {object} data object { creatorId: } can be a competition, battle
 * @param {array} participants
 * @param {function} onStart
 * @param {function} onQuit
 */
const WaitingPlayers = ({
  title,
  data,
  participants,
  onStart,
  onQuit,
  isBattle,
  animationOff
}) => {
  const { user } = User.useContainer();

  const acceptedPlayers = participants.filter(
    (participant) => participant.status === 'accepted'
  );
  const pendingPlayers = participants.filter(
    (participant) => participant.status === 'pending'
  );
  const declinedPlayers = participants.filter(
    (participant) => participant.status === 'declined'
  );
  const [modalText, setConfirmText] = useState(
    'Bạn có chắc chắn muốn rời khỏi cuộc thách đấu không?'
  );
  const [modalTitle, setModalTitle] = useState('RỜI KHỎI CUỘC THÁCH ĐẤU');
  const [acceptText, setAcceptText] = useState('RỜI KHỎI');
  const [canncelText, setCancelText] = useState('BỎ QUA');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handeQuitLobby = () => {
    setModalType('quit');
    setIsConfirmModalOpen(true);

    if (isBattle) {
      setModalTitle('THOÁT KHỎI PHÒNG CHỜ');
      setConfirmText('Bạn có chắc chắn muốn thoát khỏi phòng chờ không?');
      setAcceptText('THOÁT');
      setCancelText('BỎ QUA');
      return;
    }

    if (data.creatorId === user.id) {
      setConfirmText(
        'Cuộc thách đấu sẽ bị xoá nếu bạn rời khỏi. Bạn có chắc chắn muốn rời khỏi cuộc thách đấu không?'
      );
    } else {
      setConfirmText('Bạn có chắc chắn muốn rời khỏi cuộc thách đấu không?');
    }
    setModalTitle('RỜI KHỎI CUỘC THÁCH ĐẤU');
    setAcceptText('RỜI KHỎI');
    setCancelText('BỎ QUA');
  };

  const onConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const [modalType, setModalType] = useState('');
  const onConfirmModalOk = () => {
    setIsConfirmModalOpen(false);
    if (modalType === 'quit') onQuit();
    else if (modalType === 'start') onStart();
  };

  const handleStartCompetition = () => {
    if (pendingPlayers.length !== 0) {
      setIsConfirmModalOpen(true);
      setModalType('start');
      setConfirmText(
        'Cuộc thi đấu chưa đủ thành viên. Bạn có chắc chắn muốn bắt đầu cuộc thách đấu ngay bây giờ không?'
      );
      setModalTitle('BẮT ĐẦU CUỘC THÁCH ĐẤU');
      setAcceptText('BẮT ĐẦU');
      setCancelText('ĐỢI THÊM');
    } else {
      onStart();
    }
  };

  const Players = (
    <>
      <div className={styles.playersContainer}>
        <div className="columns is-variable is-multiline is-6 is-12-mobile has-padding-x-5 has-padding-y-4">
          {acceptedPlayers?.map((inviteUser, index) => (
            <div
              className={cn('column is-half is-12-mobile', styles.player, {
                [styles.animationOff]: animationOff
              })}
              key={inviteUser.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <InviteUserCard
                data={{
                  ...inviteUser,
                  username: isBattle ? inviteUser.username : 'Sẵn sàng chiến'
                }}
                isActive={!isBattle}
                isMySelf={user.id === inviteUser.userId}
              ></InviteUserCard>
            </div>
          ))}
          {pendingPlayers?.map((inviteUser, index) => (
            <div
              className={cn('column is-half is-12-mobile', styles.player, {
                [styles.animationOff]: animationOff
              })}
              key={inviteUser.id}
              style={{
                animationDelay: `${(index + acceptedPlayers.length) * 100}ms`
              }}
            >
              <InviteUserCard
                data={{
                  ...inviteUser,
                  username: 'Đợi một chút'
                }}
                isMySelf={user.id === inviteUser.userId}
                isDisabled
              ></InviteUserCard>
            </div>
          ))}
          {declinedPlayers?.map((inviteUser, index) => (
            <div
              className={cn('column is-half is-12-mobile', styles.player, {
                [styles.animationOff]: animationOff
              })}
              key={inviteUser.id}
              style={{
                animationDelay: `${(index + acceptedPlayers.length) * 100}ms`
              }}
            >
              <InviteUserCard
                data={{
                  ...inviteUser,
                  username: 'Từ chối tham gia'
                }}
                isMySelf={user.id === inviteUser.userId}
                isDisabled
              ></InviteUserCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={cn(styles.waitingRoom, 'competition-container')}>
        {_.isEmpty(data) ? (
          <></>
        ) : (
          <>
            <div className={cn('columns has-margin-bottom-0', styles.header)}>
              <div className="column is-2 has-text-left">
                <Button
                  outline
                  size="medium"
                  leftIconName={
                    data.creatorId === user.id ? 'icon-x' : 'icon-arrow-left'
                  }
                  onClick={handeQuitLobby}
                >
                  {data.creatorId === user.id ? 'Hủy' : 'Thoát'}
                </Button>
              </div>
              <div className="column is-8 is-centered has-margin-top-4">
                {_.isEmpty(data) ? (
                  <></>
                ) : (
                  <h5 className={cn('is-uppercase', styles.title)}>{title}</h5>
                )}
              </div>
            </div>
            <div className="has-text-centered text-is-grey has-text-weight-bold text-is-14">
              {isBattle ? 'Người chơi đã sẵn sàng:' : 'Tất cả các đấu sĩ:'}
            </div>

            <div className="has-margin-bottom-4"></div>
            {Players}

            <div
              className={cn(
                styles.footer,
                styles.footerGradient,
                'columns has-item-center'
              )}
            >
              <div className="column is-3 has-text-centered"></div>
              <div className="column is-6 has-text-centered">
                {data.creatorId === user.id && (
                  <Button
                    size="xlarge"
                    hasShadow
                    disabled={
                      participants &&
                      participants.filter((x) => x.status === 'accepted')
                        .length <= 1
                    }
                    onClick={handleStartCompetition}
                    rightIconName="icon-arrow-bold-right"
                  >
                    CHIẾN LUÔN
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        onClose={onConfirmModalClose}
        onOk={onConfirmModalOk}
        isOpen={isConfirmModalOpen}
        title={modalTitle}
        text={modalText}
        acceptText={acceptText}
        cancelText={canncelText}
      />
    </>
  );
};

export default WaitingPlayers;
