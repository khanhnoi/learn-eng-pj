import styles from './styles.module.scss';
import React, { useState, useEffect } from 'react';
import cn from 'classnames';

/**
 *
 * @param {string|number} value - key
 * @param {Array} values - Array [{key: 1, value: 1}]
 * @param {function} onSelected - function
 */
const Tab = ({ onSelected, className, values, value, isInverted }) => {
  const onItemSelected = (value) => {
    onSelected && onSelected(value);
  };

  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const $rootElement = document
      .querySelector('.tab-container')
      .getBoundingClientRect();
    const $element = document
      .querySelector('.is-tab-selected')
      .getBoundingClientRect();
    setPos($element.x - $rootElement.x);
    setWidth($element.width);
  }, [value]);

  return (
    <div
      className={cn(
        'is-inline-flex tab-container',
        styles.customTab,
        className,
        { [styles.inverted]: isInverted }
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
                [styles.isSelected]: isCurrentValue,
                'is-tab-selected': isCurrentValue
              })}
            >
              {x.label}
            </button>
          );
        })}

      <div
        className={cn(styles.highlight)}
        style={{ left: `${pos}px`, width }}
      ></div>
    </div>
  );
};

export default Tab;
