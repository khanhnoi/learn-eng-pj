import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

/**
 *
 * @param {string|number} value - key
 * @param {Array} values - Array [{key: 1, value: 1}]
 * @param {function} onSelected - function
 */
const NumberOfQuestions = ({
  onSelected,
  className,
  values,
  value,
  animationOff
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const onItemSelected = (value) => {
    onSelected && onSelected(value);
    setIsSelected(true);
  };

  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const $rootElement = document
      .querySelector('.questions-number-container')
      .getBoundingClientRect();
    const $element = document
      .querySelector('.is-question-selected')
      .getBoundingClientRect();
    setPos($element.x - $rootElement.x);
    setWidth($element.width);
  }, [value]);

  return (
    <div
      className={cn(
        'is-inline-flex questions-number-container',
        styles.numberOfQuestionsGroupButton,
        className
      )}
    >
      {values &&
        values.map((x) => {
          const isCurrentValue = x.key === value;
          return (
            <button
              key={`noq-${x.key}`}
              aria-label={'button'}
              onClick={() => onItemSelected(x.key)}
              className={cn('button', {
                'is-question-selected': isCurrentValue,
                [styles.isSelected]: isCurrentValue,
                [styles.animationOff]: animationOff
              })}
            >
              {x.label}
            </button>
          );
        })}

      {!animationOff && (
        <div
          className={cn(styles.highlight, {
            [styles.hasTransition]: isSelected
          })}
          style={{ left: `${pos}px`, width }}
        ></div>
      )}
    </div>
  );
};

export default NumberOfQuestions;
