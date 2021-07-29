import React from 'react';
import styles from './styles.module.scss';
import Coin from '../Coin';

const PromotionCard = ({ image, title, subtitle, children }) => {
  return (
    <div className={styles.card}>
      <div className="is-flex has-item-center">
        <Coin size="large" />
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
      </div>
      <div className="is-flex has-item-center">{children}</div>
    </div>
  );
};

export default PromotionCard;
