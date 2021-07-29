import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Avatar from '../Avatar';

const InviteUserCard = ({
  data,
  isMySelf,
  onAdd,
  onRemove,
  currentState,
  hasAction,
  onClick,
  isActive,
  isDisabled,
  ...props
}) => {
  return (
    <div
      className={cn(styles.card, isDisabled && styles.cardInactive)}
      style={{ backgroundColor: currentState === 1 ? '#B8C2F4' : '' }}
      {...props}
    >
      <Avatar url={data.avatar} displayName={data.displayName} size="normal" />
      <div className={styles.info}>
        <div
          className={cn(
            'text-is-bold',
            'text-is-16',
            'is-family-secondary',
            isMySelf
              ? 'text-is-purple-gradient'
              : currentState === 1
              ? 'text-is-darker'
              : 'text-is-dark'
          )}
        >
          {data.displayName}
        </div>
        <div
          className={cn(
            'text-is-14 has-text-weight-medium',
            currentState === 1 ? 'text-is-white' : 'text-is-grey',
            isActive && styles.textActive,
            {
              'has-text-weight-bold': isMySelf
            }
          )}
        >
          {isActive || isDisabled
            ? `${data.username}`
            : isMySelf
            ? 'Là chính bạn đó'
            : `@${data.username}`}
        </div>
      </div>
      {hasAction ? (
        <div className={styles.action}>
          {currentState !== 1 ? (
            <button onClick={() => onAdd(data)}>
              <i className="icon-lightning text-is-inactive"></i>
            </button>
          ) : (
            <button onClick={() => onRemove(data)}>
              <i className="icon-circle-x text-is-dark"></i>
            </button>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default InviteUserCard;
