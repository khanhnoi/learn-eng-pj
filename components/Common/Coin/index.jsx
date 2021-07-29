import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

/**
 *
 * @param {size} [normal, medium]
 */
const Coin = ({ size, infinite, ...props }) => {
  return (
    <span
      className={cn(styles.coin, styles[size], { [styles.infinite]: infinite })}
      {...props}
    >
      <img src="/static/img/icons/icon-coin.svg" alt="coin" />
    </span>
  );
};

Coin.defaultProps = {
  size: 'large' || 'medium' || 'normal' || 'small'
};

export default Coin;
