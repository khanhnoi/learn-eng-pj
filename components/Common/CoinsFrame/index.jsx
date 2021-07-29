import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Coin from '../Coin';

/**
 *
 * @param {size} [normal, medium]
 */
const CoinsFrame = ({
  size,
  badge,
  isOrangeBadge,
  noBackground,
  className
}) => {
  return (
    <div
      className={cn('is-inline-flex', styles.coinContainer, className, {
        [styles.nobg]: noBackground
      })}
    >
      <Coin size="medium" infinite />
      {badge !== undefined && (
        <div
          className={cn(styles.badge, 'text-is-18', {
            [styles.orange]: isOrangeBadge
          })}
        >
          <span className={!isOrangeBadge && 'text-is-purple-gradient'}>
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};

CoinsFrame.defaultProps = {
  size: 'normal',
  badge: undefined,
  isOrangeBadge: false,
  noBackground: false
};

export default CoinsFrame;
