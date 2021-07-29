import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const FacebookButton = ({ children, className, isRound, ...props }) => {
  return (
    <div className="is-inline-flex">
      <button
        className={cn(styles.buttonFb, className, { [styles.round]: isRound })}
        {...props}
      >
        <img src="/static/img/icons/icon-facebook.svg" alt="button" />
        <span>{children}</span>
      </button>
    </div>
  );
};

export default FacebookButton;
