import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '../Button';
import Coin from '../Coin';
import { LEVEL_PROPERTIES } from '../../../constants';

const ChallengeCard = ({ data }) => {
  const difficultyColor = LEVEL_PROPERTIES.find((x) => x.name === data.level)
    .color;

  return (
    <div className={styles.card}>
      <div className="is-flex has-justify-between">
        <span
          className={cn(
            data.promotionText.bold ? 'text-is-bold' : '',
            'text-is-14',
            data.promotionText.colorGradient
              ? `text-is-${data.promotionText.colorGradient}-gradient`
              : ''
          )}
          style={{ color: data.promotionText.color }}
        >
          {data.promotionText.text}
        </span>

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
          <span className={styles.totalBet}>
            <Coin size="normal" />
            <span className="text-is-16 text-is-bold text-is-darker text-is-secondary has-margin-left-2">
              {data.totalBet}
            </span>
          </span>
        </div>
      </div>
      <div className="is-flex has-justify-between has-margin-y-3">
        <h1
          className={cn(
            data.title.bold ? 'text-is-bold' : '',
            'is-uppercase',
            data.title.colorGradient
              ? `text-is-${data.title.colorGradient}-gradient`
              : ''
          )}
          style={{ color: data.title.color }}
        >
          {data.title.text}
        </h1>
      </div>
      <div className="is-flex has-justify-between">
        <div className={styles.participants}>
          {data.participants.map((user) => (
            <div key={user.id}>
              <img
                src={user.avatar}
                alt="user avatar"
                className={styles.avatar}
              />
            </div>
          ))}

          {data.totalParticipant > 2 ? (
            <>
              <div className={styles.separator}></div>
              <span className={styles.more}>
                <i className="icon-people"></i> +{data.totalParticipant - 2}
              </span>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="actions">
          <Button size="small" className="has-padding-x-5" secondary>
            THAM GIA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
