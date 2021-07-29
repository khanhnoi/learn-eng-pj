import React from 'react';
import cn from 'classnames';

import IconButton from '../../Common/IconButton';
import styles from './styles.module.scss';
import Avatar from '../../Common/Avatar';
import { renderCodeMaxJax } from '../../../utils';

const AnswerItem = ({ data, type, answerName, users, className, ...props }) => {
  const { id, answer, answerImage } = data;

  const buttonStyle = cn(styles.button, styles[type]);

  return (
    <div
      className={cn('is-flex has-item-center', styles.answerItem, className)}
      {...props}
    >
      <IconButton className={buttonStyle}>{answerName}</IconButton>
      {answerImage ? (
        <img
          className="has-margin-left-4 has-margin-right-4"
          alt={`answer-${id}`}
          src={answerImage}
          height="80px"
        />
      ) : (
        <div className="has-margin-left-4 text-is-18 has-margin-right-4">
          {renderCodeMaxJax(answer)}
        </div>
      )}
      {users.map((x, index) => (
        <div
          key={`avt-answer-${x.avatar}-${index}`}
          className="has-margin-left-2 has-margin-right-2"
        >
          <Avatar url={x.avatar} displayName={x.displayName} hasTooltip />
        </div>
      ))}
    </div>
  );
};

export default AnswerItem;
