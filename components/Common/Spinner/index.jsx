import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Spinner = ({ enable, isLocal, isDark, className, showLogo }) => {
  return (
    <div
      className={cn(
        styles.container,
        {
          [styles.show]: enable,
          [styles.local]: isLocal,
          [styles.hasLogo]: showLogo
        },
        className
      )}
    >
      {!showLogo ? (
        <div className={cn(styles.ldsEllipsis, { [styles.dark]: isDark })}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className={styles.logoContainer}>
          <img src="/static/img/xagoe_logo.svg" alt="logo" />
        </div>
      )}
    </div>
  );
};

Spinner.defaultProps = {
  enable: false,
  isLocal: false,
  isDark: false
};

export default Spinner;
