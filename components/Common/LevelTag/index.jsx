import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { LEVEL_PROPERTIES } from '../../../constants';

const LevelTag = ({ level, className, isSmall }) => {
  return (
    <span
      className={cn(styles.level, styles[level], className, {
        [styles.small]: isSmall
      })}
    >
      <i className="icon-flame"></i>
      {LEVEL_PROPERTIES.find((x) => x.name === level).label}
    </span>
  );
};

export default LevelTag;
