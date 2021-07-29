/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import moment from 'moment';
import 'moment/locale/vi';
import { SUBJECTS, LEVEL_PROPERTIES } from '../../../constants';
import Coin from '../Coin';

const UpcomingCard = ({ data, isRed, onTimeout, onClick }) => {
  const [secsLeft, setSecsLeft] = useState(
    Math.floor(moment(data.startTime).diff(moment()) / 1000)
  );

  useEffect(() => {
    setTimeout(() => {
      setSecsLeft(Math.floor(moment(data.startTime).diff(moment()) / 1000));
    }, 1000);

    if (secsLeft < 0) {
      onTimeout();
    }
  }, [onTimeout, secsLeft, data.startTime]);

  const difficultyColor = LEVEL_PROPERTIES.find((x) => x.name === data.level)
    .color;

  return (
    <div
      className={styles.card}
      onClick={() => onClick(data)}
      onKeyPress={() => onClick(data)}
      role="button"
      tabIndex="0"
    >
      <div className="is-flex has-justify-between">
        <span
          className={cn(
            isRed ? 'text-is-red' : 'text-is-grey',
            'text-is-bold',
            'text-is-14'
          )}
        >
          {secsLeft < 0
            ? 'Đã bắt đầu'
            : secsLeft === 0
            ? '...'
            : secsLeft < 60
            ? `${secsLeft} giây nữa`
            : secsLeft < 60 * 60
            ? `${Math.floor(
                moment(data.startTime).diff(moment()) / 1000 / 60
              )} phút nữa`
            : moment(data.startTime).calendar()}
        </span>
        <div className="is-flex has-justify-center">
          <Coin size="normal" />
          <span className="text-is-16 text-is-bold text-is-darker text-is-secondary has-margin-left-2">
            {data.totalBet}
          </span>
        </div>
      </div>
      <div className="is-flex has-justify-between has-margin-y-3">
        <h1 className="is-uppercase text-is-dark">
          {SUBJECTS.SHORT[data.subject]} {data.grade}
        </h1>
        <a href="#" className="is-flex has-justify-center">
          <img src="/static/img/icons/icon-arrow-right.svg" alt="" />
        </a>
      </div>
      <div className={styles.meta}>
        <span className={styles.difficulty}>
          <i className={cn('icon-flame', `text-is-${difficultyColor}`)}></i>
        </span>
        <span className={styles.duration}>
          <i className="icon-timer"></i>
          <span>{data.durationInSeconds / 60}p</span>
        </span>
        <span className={styles.totalQuestion}>
          <i className="icon-question-circle"></i>
          <span>{data.totalQuestion}</span>
        </span>
      </div>
    </div>
  );
};

export default UpcomingCard;
