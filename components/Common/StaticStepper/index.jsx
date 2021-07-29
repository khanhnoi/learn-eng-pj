import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import _ from 'lodash';
import Coin from '../Coin';

const StaticStepper = (props) => {
  const { isMultiBet, values } = props;
  if (isMultiBet) {
    const rewards = _.orderBy(values, (x) => x.order);
    if (rewards.length < 3) return <></>;
    return (
      <div className={cn(styles.multiBetContainer)}>
        <div className={cn(styles.rankContainer)}>
          <div className={cn(styles.rank, styles.first)}>1</div>
          <SingleStepper {...props} value={rewards[0].reward} />
        </div>
        <div className={cn(styles.rankContainer)}>
          <div className={cn(styles.rank, styles.second)}>2</div>
          <SingleStepper {...props} value={rewards[1].reward} />
        </div>
        <div className={cn(styles.rankContainer)}>
          <div className={cn(styles.rank, styles.third)}>3</div>
          <SingleStepper {...props} value={rewards[2].reward} />
        </div>
      </div>
    );
  }

  return <SingleStepper {...props} />;
};

const SingleStepper = ({ value, isDuration, isBet }) => (
  <div className={cn('is-inline-flex', styles.customStepper)}>
    <label
      className={cn({
        [styles.text14]: value >= 1000,
        [styles.bet]: isBet,
        [styles.duration]: isDuration
      })}
    >
      <span>{value}</span>
    </label>
    {isBet && (
      <div className={cn(styles['c-bet'])}>
        <Coin size="small" />
      </div>
    )}
    {isDuration && <div className={cn(styles['c-duration'])}>Phút</div>}
  </div>
);

export default StaticStepper;
