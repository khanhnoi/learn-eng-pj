import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { SUBJECT_PROPERTIES } from '../../../constants';

const SubjectTag = ({
  subject,
  selected,
  onSubjectClick,
  className,
  isSmall,
  animationOff,
  variant,
  unselectable
}) => {
  const subjectProperties = SUBJECT_PROPERTIES.find((x) => x.name === subject);
  const icon = subjectProperties.icon;
  const subjectName = subjectProperties.shortName;

  const handleSubjectClick = () => {
    onSubjectClick(subject);
  };

  return (
    <span
      onClick={handleSubjectClick}
      onKeyPress={handleSubjectClick}
      tabIndex={0}
      role="button"
      className={cn(styles.subjectContainer, className, styles[variant], {
        [styles.selected]: selected,
        [styles.small]: isSmall,
        [styles.animationOff]: animationOff,
        [styles.unselectable]: unselectable
      })}
    >
      <div className={styles.content}>
        <i className={cn(styles.icon, icon)}></i>
        <br />
        <span className={cn(styles.name)}>{subjectName}</span>
      </div>
    </span>
  );
};

export default SubjectTag;
