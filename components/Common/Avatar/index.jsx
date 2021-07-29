import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

/**
 *
 * @param {size} [small, normal, large] = [32, 40, 186]
 */

const Avatar = ({
  url,
  size,
  badge,
  isBadgeInverted,
  displayName,
  className,
  onClick,
  role,
  hasTooltip,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'is-inline-flex',
        styles.avatarContainer,
        styles[size],
        className,
        {
          [styles.button]: role === 'button'
        }
      )}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={0}
      role="button"
      data-tooltip={hasTooltip && displayName}
    >
      {url ? (
        <img src={url} alt="avatar" />
      ) : (
        <LetterAvatar name={displayName} size={size}></LetterAvatar>
      )}
      {badge !== undefined && (
        <div
          className={cn(styles.badge, {
            [styles.inverted]: isBadgeInverted
          })}
        >
          {isBadgeInverted ? (
            <span className="text-is-14">{badge}</span>
          ) : (
            <span className={cn('text-is-14', styles.text)}>{badge}</span>
          )}
        </div>
      )}
    </div>
  );
};

const LetterAvatar = ({ name, size }) => {
  const nameSplitted = name.split(' ');
  let letters = nameSplitted[0]?.charAt(0)?.toUpperCase();
  if (nameSplitted[1]) {
    letters += nameSplitted[1]?.charAt(0)?.toUpperCase();
  }
  return <div className={cn(styles.letterAvatar, styles[size])}>{letters}</div>;
};

Avatar.defaultProps = {
  url: null,
  size: 'normal',
  badge: undefined,
  isBadgeInverted: false,
  displayName: 'Unknown',
  role: ''
};

export default Avatar;
