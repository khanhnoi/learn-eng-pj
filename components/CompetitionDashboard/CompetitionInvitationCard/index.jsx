import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import 'moment/locale/vi';
import { SUBJECTS, LEVEL_PROPERTIES } from '../../../constants';
import IconButton from '../../Common/IconButton';
import Button from '../../Common/Button';
import Avatar from '../../Common/Avatar';
import Coin from '../../Common/Coin';

const CompetitionInvitationCard = ({
  myId,
  data,
  onTimeout,
  accepted,
  className,
  onAcceptClick,
  onDeclineClick,
  isActionLoading,
  onMouseChange,
  showFull,
  ...props
}) => {
  const { competition } = data;

  const [isFull, setIsFull] = useState(false);

  const levelProperties = LEVEL_PROPERTIES.find(
    (x) => x.name === competition.level
  );
  const difficultyColor = levelProperties.color;
  const difficultyLabel = levelProperties.label;

  const creator = competition.participants.find(
    (user) => user.userId === competition.createdById
  );
  const participants = competition.participants.filter(
    (user) => user.userId !== competition.createdById
  );
  const displayParticipants = participants.slice(0, 2);
  const hiddenParticipantCount =
    participants.length - 2 > 0 ? participants.length - 2 : 0;

  const handleMouseEnter = () => {
    setIsFull(true);
    onMouseChange(true);
  };

  const handleMouseLeave = () => {
    setIsFull(false);
    onMouseChange(false);
  };

  const onAccept = () => {
    const participant = competition.participants.find((x) => x.userId === myId);
    onAcceptClick && onAcceptClick(participant?.id, competition.id);
  };

  const onDecline = () => {
    const participant = competition.participants.find((x) => x.userId === myId);
    onDeclineClick &&
      onDeclineClick(participant && participant.id, competition.id);
  };

  return (
    <div
      className={cn(styles.card, className, {
        [styles.full]: showFull || isFull,
        [styles.collapse]: !isFull
      })}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="is-flex has-justify-between has-item-center">
        <span
          className={cn('text-is-grey', 'text-is-bold', 'text-is-14')}
          style={{ whiteSpace: 'nowrap' }}
        >
          {'Lời mời thách đấu'}
        </span>

        <div className={styles.meta}>
          <span
            className={styles.difficulty}
            data-tooltip={`Cấp độ: ${difficultyLabel}`}
          >
            <i className={cn('icon-flame', `text-is-${difficultyColor}`)}></i>
          </span>
          <span
            className={styles.duration}
            data-tooltip={`Thời lượng: ${
              competition.durationInSeconds / 60
            } phút`}
          >
            <i className="icon-timer"></i>
            <span>{competition.durationInSeconds / 60}p</span>
          </span>
          <span
            className={styles.totalQuestion}
            data-tooltip={`Câu hỏi: ${competition.totalQuestions} câu`}
          >
            <i className="icon-question-circle"></i>
            <span>{competition.totalQuestions}</span>
          </span>
          <span
            className={styles.totalBet}
            data-tooltip={`Đặt cược: ${competition.bet} Xcoin`}
          >
            <Coin size="normal" />
            <span className="text-is-16 text-is-bold text-is-darker text-is-secondary has-margin-left-2">
              {competition.bet}
            </span>
          </span>
        </div>
      </div>
      <div className="is-flex has-justify-between has-margin-y-3">
        <h1 className="is-uppercase text-is-dark">
          {SUBJECTS.SHORT[competition.subject]} {competition.grade}
        </h1>
      </div>
      <div className="is-flex has-justify-between">
        <div className={styles.participants}>
          <div className={styles.creator}>
            <Avatar
              size="small"
              url={creator.avatar}
              displayName={creator.displayName}
              onClick={() => {
                window.open(`/profile/${creator.userId}`, '_blank');
              }}
              hasTooltip
            ></Avatar>
            <span>{creator.displayName}</span>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.others}>
            {displayParticipants.map((user, index) => (
              <Avatar
                key={user.id}
                size="small"
                url={user.avatar}
                displayName={user.displayName}
                className={cn(styles.participant, 'has-margin-right-2')}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
                onClick={() => {
                  window.open(`/profile/${user.userId}`, '_blank');
                }}
                hasTooltip
              ></Avatar>
            ))}
            {hiddenParticipantCount > 0 ? (
              <span className={styles.more}>+{hiddenParticipantCount}</span>
            ) : (
              ''
            )}
          </div>
        </div>
        {!accepted ? (
          <div className={cn('actions', styles.buttonContainer)}>
            <IconButton
              onClick={onDecline}
              size="small"
              name="icon-x"
              grey
              className={cn(
                isActionLoading ? 'is-loading' : '',
                styles.closeButton
              )}
            ></IconButton>
            <Button
              onClick={onAccept}
              size="small"
              className={cn(
                'has-padding-x-5',
                'has-margin-left-4',
                isActionLoading ? 'is-loading' : '',
                styles.acceptedButton
              )}
            >
              ĐỒNG Ý
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CompetitionInvitationCard;
