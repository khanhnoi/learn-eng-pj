import styles from './styles.module.scss';
import React from 'react';
import cn from 'classnames';

/**
 *
 * @param {string} name - icon name
 * @param {string|StyleSheet} iconClassName - style
 */
const IconText = ({
  onClick,
  name,
  className,
  iconClassName,
  children,
  ...props
}) => {
  const iconStyle = cn(styles.icon, iconClassName);
  return (
    <div
      className={cn(
        'is-inline-flex',
        styles.customIconText,
        'text-is-20',
        className
      )}
      {...props}
    >
      {name && <i className={cn(name, iconStyle)}></i>}
      {children}
    </div>
  );
};

export default IconText;
