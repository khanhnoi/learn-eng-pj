import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '../Button';
import moment from 'moment';
import _ from 'lodash';
import Coin from '../Coin';
import { LEVEL_PROPERTIES } from '../../../constants';

const BattleCard = ({ data, onJoinBattle, className, ...props }) => {
  const {
    durationInSeconds,
    expirationTime,
    grade,
    id,
    level,
    rewards,
    startTime,
    status,
    subTitle,
    subTitleProps,
    subjects,
    title,
    titleProps,
    totalQuestions,
    type
  } = data;

  const highestRewart = rewards?.filter((reward) => reward?.order === 1)[0]
    .reward;
  const timePoint = type === 'realtime' ? startTime : expirationTime;

  const levelProperties = LEVEL_PROPERTIES.find((x) => x.name === level.name);
  const difficultyColor = levelProperties.color;
  const difficultyLabel = levelProperties.label;

  const SECOND = 1;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const [secsLeft, setSecsLeft] = useState(
    moment(timePoint).diff(moment()) / 1000
  );

  useEffect(() => {
    setTimeout(() => {
      setSecsLeft(moment(timePoint).diff(moment()) / 1000);
    }, 1000);
  }, [secsLeft, timePoint]);

  const getEndTimeDescription = (timeLeft) => {
    if (timeLeft < 0) {
      return `Trận đấu đã hết thời hạn tham gia`;
    }

    if (timeLeft < MINUTE) {
      return `Hết hạn trong vòng ${Math.floor(timeLeft)} giây nữa!!!`;
    }

    if (timeLeft < HOUR) {
      return `Hết hạn trong vòng ${Math.floor(timeLeft / MINUTE)} phút nữa!!`;
    }
    if (timeLeft < 2 * HOUR) {
      return `Hết hạn trong vòng ${Math.floor(
        timeLeft / HOUR
      )} giờ ${Math.floor((timeLeft - HOUR) / MINUTE)} phút nữa!`;
    }
    return `Hết hạn vào ${moment(timePoint)
      .format('HH:mm - DD/MM/YYYY')
      .toUpperCase()}`;
  };

  const getStartTimeDescription = (timeLeft) => {
    if (timeLeft < 0) {
      return `Trận đấu đã được bắt đầu`;
    }

    if (timeLeft < MINUTE) {
      return `Bắt đầu trong vòng ${Math.floor(timeLeft)} giây nữa!!!`;
    }

    if (timeLeft < HOUR) {
      return `Bắt đầu trong vòng ${Math.floor(timeLeft / MINUTE)} phút nữa!!`;
    }
    if (timeLeft < 2 * HOUR) {
      return `Bắt đầu trong vòng ${Math.floor(
        timeLeft / HOUR
      )} giờ ${Math.floor((timeLeft - HOUR) / MINUTE)} phút nữa!`;
    }
    return `Bắt đầu lúc ${moment(timePoint)
      .format('HH:mm - DD/MM/YYYY')
      .toUpperCase()}`;
  };

  const handleJoinBattle = () => {
    onJoinBattle(id);
  };

  const isInAnHour = secsLeft < HOUR;

  return (
    <div className={cn(styles.card, className)} {...props}>
      <div className="is-flex has-justify-between">
        <span
          className={cn(
            'text-is-bold',
            'text-is-14',
            _.isEmpty(subTitleProps) && 'text-is-purple-gradient'
          )}
          style={subTitleProps}
        >
          {subTitle}
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
            data-tooltip={`Thời lượng: ${durationInSeconds / MINUTE} phút`}
          >
            <i className="icon-timer"></i>
            <span>{durationInSeconds / MINUTE}p</span>
          </span>
          <span
            className={styles.totalQuestion}
            data-tooltip={`Câu hỏi: ${totalQuestions} câu`}
          >
            <i className="icon-question-circle"></i>
            <span>{totalQuestions}</span>
          </span>
          <span
            className={styles.totalBet}
            data-tooltip={`Thưởng: ${highestRewart} Xcoin`}
          >
            <Coin size="normal" />
            <span className="text-is-16 text-is-bold text-is-darker text-is-secondary has-margin-left-2">
              {highestRewart}
            </span>
          </span>
        </div>
      </div>
      <div className="is-flex has-justify-between has-margin-y-3">
        <h1
          className={cn(
            'text-is-bold',
            'is-uppercase',
            _.isEmpty(titleProps) && 'has-text-grey-dark'
          )}
          style={titleProps}
        >
          {title}
        </h1>
      </div>
      <div className="is-flex-desktop has-justify-between">
        <div className={styles.participants}>
          <>
            <span className={cn(styles.more, isInAnHour && 'has-text-danger')}>
              <i className="icon-stopwatch"></i>

              {type === 'realtime'
                ? getStartTimeDescription(secsLeft)
                : getEndTimeDescription(secsLeft)}
            </span>
          </>
        </div>
        <div className="actions">
          <Button
            className={cn('has-padding-x-5', styles.btnJoin)}
            size="small"
            secondary
            onClick={handleJoinBattle}
            disabled={secsLeft < 0}
          >
            {type === 'realtime' ? 'VÀO PHÒNG CHỜ' : 'THAM GIA'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BattleCard;
