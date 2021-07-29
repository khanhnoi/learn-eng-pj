import React from 'react';
import cn from 'classnames';

import IconButton from '../../Common/IconButton';
import styles from './styles.module.scss';
import { renderCodeMaxJax } from '../../../utils';

const AnswerItem = ({
  data,
  isSelected,
  onSelected,
  answerName,
  className,
  ...props
}) => {
  const { id, answer, answerImage } = data;

  const onClick = () => {
    onSelected && onSelected(data);
  };

  const buttonStyle = isSelected ? styles.activeButton : styles.button;

  return (
    <div
      className={cn('is-flex has-item-center', styles.answerItem, className)}
      {...props}
    >
      <IconButton onClick={onClick} className={buttonStyle}>
        {answerName}
      </IconButton>
      {answerImage ? (
        <div onClick={onClick} role="button" tabIndex="0" onKeyPress={onClick}>
          <img alt={`answer-${id}`} src={answerImage} height="80px" />
        </div>
      ) : (
        <div
          onClick={onClick}
          role="button"
          tabIndex="0"
          onKeyPress={onClick}
          className={cn('has-margin-left-4 text-is-18', styles.answerText)}
        >
          {renderCodeMaxJax(answer)}
        </div>
      )}
    </div>
  );
};

export default AnswerItem;
