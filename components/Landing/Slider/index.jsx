import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Slider = ({ items, currentIndex, variant, spacing, onSelect }) => {
  return (
    <div className={cn(styles.sliderContainer)}>
      {items.map((item, index) => (
        <span
          onClick={() => {
            onSelect(item.id);
          }}
          onKeyDown={() => {
            onSelect(item.id);
          }}
          key={item.id}
          className={cn(styles[spacing], {
            [styles[variant]]: currentIndex === item.id
          })}
          tabIndex={0}
          role="button"
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default Slider;
