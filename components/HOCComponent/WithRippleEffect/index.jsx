import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useRef } from 'react';

const withRippleEffect = (Component) => (props) => {
  const randomIdRef = useRef(
    'button-' + Math.random().toString(36).substring(2)
  );

  const handleMouseDown = (evt) => {
    const $button = document.querySelector(
      `[data-button=${randomIdRef.current}]`
    );
    if (!$button) return;
    const buttonPostition = $button.getBoundingClientRect();
    const x = evt.clientX - buttonPostition.x;
    const y = evt.clientY - buttonPostition.y;

    let ripple = document.createElement('span');
    ripple.classList.add(styles.ripple);
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    $button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  const newClassName = cn(props.className, styles.rippleEffect);

  return (
    <Component
      {...props}
      className={newClassName}
      onMouseDown={handleMouseDown}
      data-button={randomIdRef.current}
    />
  );
};

export default withRippleEffect;
