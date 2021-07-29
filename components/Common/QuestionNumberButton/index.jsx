import styles from './styles.module.scss';
import React from 'react';
import cn from 'classnames';

/**
 *
 * @param {string} type in [default, answered, active, right, wrong, active-answer ]
 * @param {function} onSelected - function
 */
const QuestionNumberButton = ({
  onSelected,
  className,
  children,
  hasShadow,
  type = 'default',
  size = 'medium',
  ...props
}) => {
  const onClick = () => {
    onSelected && onSelected(children);
  };
  const btnStyle = cn(styles[type]);
  return (
    <div className={cn('is-inline-flex', styles.questionNumberButton)}>
      <button
        className={cn('button', btnStyle, className, styles[size])}
        type="submit"
        aria-label={'button'}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default QuestionNumberButton;
