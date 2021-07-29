import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import styles from './styles.module.scss';
import Spinner from '../../Common/Spinner';
import StaticStepper from '../../Common/StaticStepper';
import { MINUTE, HOUR } from '../../../constants';
import cn from 'classnames';
import LevelTag from '../../Common/LevelTag';
import Input from '../../Common/Input';
import FacebookButton from '../../Common/Button/FacebookButton';
import { FacebookShareButton } from 'react-share';

const RoomInfo = ({ data, onTimeout, isBattle }) => {
  const {
    time,
    rewards = [],
    bet,
    totalQuestions = 0,
    level = 'medium',
    durationInSeconds = 0,
    token,
    fbShareUrl,
    fbShareQuote
  } = data;

  const durationInMins = durationInSeconds / 60;

  const handleSelectAll = () => {
    const $input = document.querySelector(`[data-input='share']`);
    $input.select();
  };

  const Duration = (
    <div className={cn(styles.durationContainer)}>
      <p>Thời lượng:</p>
      <StaticStepper value={durationInMins} isDuration />
    </div>
  );

  const Bet = (
    <div className={cn(styles.betContainer)}>
      <p>Phần thưởng:</p>
      <StaticStepper value={bet} values={rewards} isBet isMultiBet={isBattle} />
    </div>
  );

  const Level = (
    <div className={cn(styles.levelContainer)}>
      <p>Cấp độ:</p>
      <LevelTag level={level} isSmall />
    </div>
  );

  const Question = (
    <div className={cn(styles.questionContainer)}>
      <p>Số câu hỏi:</p>
      <div className={styles.questions}>{totalQuestions}</div>
    </div>
  );
  const [secsLeft, setSecsLeft] = useState(
    Math.floor(moment(time).diff(moment()) / 1000)
  );

  const getShareUrl = () => {
    let href = window?.location?.href
      ?.replace('https://', '')
      ?.replace('http://', '');

    if (token && window?.location && !window.location?.search) {
      href += `?token=${token}`;
    }

    return href;
  };

  const ShareLink = (
    <div className={cn(styles.shareLinkContainer)}>
      <p className="has-margin-bottom-3">
        Copy link bên dưới đây và gửi cho bạn bè bạn nhé!
      </p>
      <Input
        data-input="share"
        iconName="icon-share"
        className={cn(styles.shareInput)}
        value={getShareUrl()}
        onIconClick={handleSelectAll}
      />
      <div className="has-margin-bottom-4"></div>
      <p className="has-margin-bottom-3">- hoặc chia sẻ bằng -</p>

      <FacebookShareButton url={fbShareUrl} quote={fbShareQuote}>
        <FacebookButton className={cn(styles.button)} onClick={() => {}}>
          Facebook
        </FacebookButton>
      </FacebookShareButton>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      setSecsLeft(Math.floor(moment(time).diff(moment()) / 1000));
    }, 1000);

    if (secsLeft < 0) {
      onTimeout && onTimeout();
    }
  }, [onTimeout, secsLeft, time]);

  const twoDigits = (number) => {
    if (number < 0) return '00';
    if (number < 10) return '0' + number;
    return number;
  };
  const getCountDownTime = (time) => {
    const minute = Math.floor(time / MINUTE) || 0;
    const second = time % MINUTE || 0;
    return `${twoDigits(minute)} phút ${twoDigits(second)} giây`;
  };

  return (
    <div
      className={cn(
        'has-text-weight-medium has-text-centered',
        styles.infoContainer
      )}
    >
      <div className="has-margin-bottom-4"></div>
      {isBattle && (
        <div>
          <div className="text-is-16 has-margin-bottom-2 has-text-grey">
            {secsLeft < HOUR ? (
              <span>
                Trận đấu sẽ <br /> bắt đầu trong:
              </span>
            ) : (
              <span>
                Trận đấu sẽ <br /> bắt đầu vào:
              </span>
            )}
          </div>
          <div
            className={cn(
              'is-family-secondary has-margin-bottom-4 has-text-weight-bold',
              {
                'text-is-20': secsLeft >= HOUR,
                'text-is-22': secsLeft < HOUR && secsLeft > MINUTE,
                'text-is-24': secsLeft < MINUTE
              }
            )}
            style={{ color: '#FF9500' }}
          >
            <i className="icon-timer has-text-grey has-margin-right-2"></i>
            {secsLeft < -10
              ? 'Đã bắt đầu'
              : secsLeft < -1
              ? 'Đang bắt đầu'
              : secsLeft <= 0
              ? 'Hãy sẵn sàng'
              : secsLeft < MINUTE
              ? `${secsLeft} giây nữa`
              : secsLeft < 10 * MINUTE
              ? getCountDownTime(secsLeft)
              : secsLeft < HOUR
              ? `${Math.floor(
                  moment(data.time).diff(moment()) / 1000 / MINUTE
                )} phút tới`
              : moment(data.time).format('DD/MM - HH:mm')}
          </div>
        </div>
      )}

      {_.isEmpty(data) ? (
        <Spinner enable isLocal isDark></Spinner>
      ) : (
        <div className={cn(styles.roomInfoContainer)}>
          {Bet}
          <div
            className={cn(styles.levelQuestionContainer, {
              [styles.battle]: isBattle
            })}
          >
            {Level}
            {Question}
          </div>
          {Duration}
          {ShareLink}
        </div>
      )}
    </div>
  );
};

export default RoomInfo;
