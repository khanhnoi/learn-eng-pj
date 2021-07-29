import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { LEVEL_PROPERTIES } from '../../../constants';

/**
 *
 * @param {string|number} value - key
 * @param {Array} values - Array [{key: 1, value: 1, color: #FAFFAA}]
 * @param {function} onSelected - function
 */
const QuestionLevel = ({ onSelected, className, value, animationOff }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onItemSelected = (value) => {
    onSelected(value);
    setIsSelected(true);
  };

  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animationOff) return;
    const $rootElement = document
      .querySelector('.questions-level-container')
      .getBoundingClientRect();
    const $element = document
      .querySelector('.is-level-selected')
      .getBoundingClientRect();
    setPos($element.x - $rootElement.x);
    setWidth($element.width);
  }, [value]);

  const bgColor = LEVEL_PROPERTIES.find((x) => x.name === value).hex;

  return (
    <div
      className={cn(
        'is-inline-flex questions-level-container',
        styles.numberOfQuestionsGroupButton,
        className
      )}
    >
      {LEVEL_PROPERTIES.map((x) => {
        const isCurrentValue = x.name === value;
        const iconStyle = isCurrentValue ? {} : { color: x.hex };

        return (
          <button
            key={`ql-${x.name}`}
            aria-label={'button'}
            onClick={() => onItemSelected(x.name)}
            className={cn('button', {
              'is-level-selected': isCurrentValue,
              [styles.isSelected]: isCurrentValue,
              [styles.animationOff]: animationOff
            })}
          >
            <i className="icon-flame" style={iconStyle}></i>
            {x.label}
          </button>
        );
      })}
      {!animationOff && (
        <div
          className={cn(styles.highlight, {
            [styles.hasTransition]: isSelected
          })}
          style={{ left: `${pos}px`, width, background: `${bgColor}` }}
        ></div>
      )}
    </div>
  );
};

export default QuestionLevel;
