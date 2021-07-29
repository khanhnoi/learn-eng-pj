import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import moment from 'moment';
import 'moment/locale/vi';
import { SUBJECTS, LEVEL_PROPERTIES } from '../../../constants';
import IconButton from '../IconButton';
import Button from '../Button';
import Avatar from '../Avatar';
import Coin from '../Coin';

const InvitationCard = ({
  data,
  onTimeout,
  accepted,
  className,
  onAcceptClick,
  onDeclineClick,
  isActionLoading,
  ...props
}) => {
  const { match } = data;
  const [secsLeft, setSecsLeft] = useState(
    Math.floor(moment(match.startTime).diff(moment()) / 1000)
  );

  useEffect(() => {
    setTimeout(() => {
      setSecsLeft(Math.floor(moment(match.startTime).diff(moment()) / 1000));
    }, 1000);

    if (secsLeft < 0) {
      onTimeout && onTimeout();
    }
  }, [onTimeout, secsLeft, match.startTime]);

  const difficultyColor = LEVEL_PROPERTIES.find((x) => x.name === match.level)
    .color;

  const creator = match.participants.find(
    (user) => user.userId === match.createdById
  );
  const participants = match.participants.filter(
    (user) => user.userId !== match.createdById
  );
  const displayParticipants = participants.slice(0, 2);
  const hiddenParticipantCount =
    participants.length - 2 > 0 ? participants.length - 2 : 0;

  return (
    <div className={cn(styles.card, className)} {...props}>
      <div className="is-flex has-justify-between">
        <span className={cn('text-is-grey', 'text-is-bold', 'text-is-14')}>
          {secsLeft < 0
            ? 'Đã bắt đầu'
            : secsLeft === 0
            ? '...'
            : secsLeft < 60
            ? `${secsLeft} giây nữa`
            : secsLeft < 60 * 60
            ? `${Math.floor(
                moment(match.startTime).diff(moment()) / 1000 / 60
              )} phút nữa`
            : moment(match.startTime).calendar()}
        </span>

        <div className={styles.meta}>
          <span className={styles.difficulty}>
            <i className={cn('icon-flame', `text-is-${difficultyColor}`)}></i>
          </span>
          <span className={styles.duration}>
            <i className="icon-timer"></i>
            <span>{match.durationInSeconds / 60}p</span>
          </span>
          <span className={styles.totalQuestion}>
            <i className="icon-question-circle"></i>
            <span>{match.totalQuestion}</span>
          </span>
          <span className={styles.totalBet}>
            <Coin size="normal" />
            <span className="text-is-16 text-is-bold text-is-darker text-is-secondary has-margin-left-2">
              {match.totalBet}
            </span>
          </span>
        </div>
      </div>
      <div className="is-flex has-justify-between has-margin-y-3">
        <h1 className="is-uppercase text-is-dark">
          {SUBJECTS.SHORT[match.subject]} {match.grade}
        </h1>
      </div>
      <div className="is-flex has-justify-between">
        <div className={styles.participants}>
          <div className={styles.creator}>
            <Avatar
              size="small"
              src={creator.avatar}
              displayName={creator.displayName}
            ></Avatar>
            <span>{creator.displayName}</span>
          </div>
          <div className={styles.separator}></div>
          {displayParticipants.map((user) => (
            <div key={user.id}>
              <Avatar
                size="small"
                src={user.avatar}
                displayName={user.displayName}
                className="has-margin-right-2"
              ></Avatar>
            </div>
          ))}
          {hiddenParticipantCount > 0 ? (
            <span className={styles.more}>+{hiddenParticipantCount}</span>
          ) : (
            ''
          )}
        </div>
        {!accepted ? (
          <div className="actions">
            <IconButton
              onClick={onDeclineClick}
              size="small"
              name="icon-x"
              grey
              className={cn(isActionLoading ? 'is-loading' : '')}
            ></IconButton>
            <Button
              onClick={onAcceptClick}
              size="small"
              className={cn(
                'has-padding-x-5',
                'has-margin-left-4',
                isActionLoading ? 'is-loading' : ''
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

export default InvitationCard;
