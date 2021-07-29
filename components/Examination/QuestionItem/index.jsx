import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { renderCodeMaxJax } from '../../../utils';

const QuestionItem = ({
  data: { id, question, questionImage },
  className,
  preventCopy
}) => {
  return (
    <div
      className={cn(styles.questionItem, className, {
        [styles.preventCopy]: preventCopy
      })}
    >
      {renderCodeMaxJax(question)}
    </div>
  );
};

export default QuestionItem;
