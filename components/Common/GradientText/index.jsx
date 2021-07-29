import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const GradientText = ({ children, className, variant }) => {
  return (
    <span className={cn(className, styles.container, styles[variant])}>
      {children}
    </span>
  );
};
export default GradientText;
