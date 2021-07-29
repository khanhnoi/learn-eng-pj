import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Avatar from '../Avatar';

const SimpleUserCard = ({ data, isMySelf, touchable, className, ...props }) => {
  return (
    <div
      className={cn(styles.card, className, { [styles.touchable]: touchable })}
      {...props}
    >
      <Avatar
        url={data.avatar}
        displayName={data.displayName}
        className={styles.userAvatar}
      ></Avatar>
      <div className={styles.info}>
        <div
          className={cn(
            styles.name,
            isMySelf ? 'text-is-purple-gradient' : 'text-is-dark',
            'text-is-bold',
            'is-family-secondary'
          )}
        >
          {data.displayName}
        </div>
        <div className={cn('text-is-grey', styles.desc)}>{data.subtitle}</div>
      </div>
    </div>
  );
};

export default SimpleUserCard;
