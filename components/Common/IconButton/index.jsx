import styles from './styles.module.scss';
import React from 'react';
import cn from 'classnames';

/**
 *
 * @param {string} name - icon name
 * @param {string} size - in [small, medium, large, xlarge, xxlarge]
 */
const IconButton = ({
  onClick,
  name,
  className,
  children,
  hasShadow,
  secondary,
  outline,
  grey,
  size = 'medium',
  ...props
}) => {
  const shadowStyle = hasShadow && styles.shadow;
  const btnStyle = cn(
    styles[`btn-${size}`],
    secondary && styles.secondary,
    outline && styles.outline,
    grey && styles.grey,
    shadowStyle
  );
  const iconStyle = cn(
    styles[`icon-${size}`],
    styles[`mr-${size}`],
    styles.icon
  );
  return (
    <div className={cn('is-inline-flex', styles.customIconButton)}>
      <button
        className={cn('button', btnStyle, className)}
        aria-label={'button'}
        onClick={onClick}
        {...props}
      >
        {children}
        {name && <i className={cn(name, iconStyle)}></i>}
      </button>
    </div>
  );
};

export default IconButton;
