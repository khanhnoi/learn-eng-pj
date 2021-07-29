import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Coin from '../Coin';

/**
 *
 * @param {number} value - number
 * @param {number} step - number
 * @param {string} type - in [grade,duration,bet]
 */
const Stepper = ({
  onChange,
  type = 'grade',
  step = 1,
  min = 0,
  max = 100,
  value,
  className,
  children,
  animationOff,
  ...props
}) => {
  const btnStyle = cn(className);
  const iconStyle = cn(styles.icon);
  const [animate, setAnimate] = useState(false);

  const onMinus = () => {
    let newValue = value - step;
    if (isDuration) {
      if (newValue === 75) {
        newValue = 45;
      }
    }
    if (newValue >= min) {
      onChange && onChange(newValue);
    }
  };

  const onPlus = () => {
    let newValue = value + step;
    if (isDuration) {
      if (newValue === 60) {
        newValue = 90;
      }
    }
    if (newValue <= max) {
      onChange && onChange(newValue);
    }
  };

  const onStartPlus = () => {
    setIsAdd(true);
    setAuto(true);
  };
  const onStartMinus = () => {
    setIsAdd(false);
    setAuto(true);
  };
  const onEnd = () => {
    setAuto(false);
  };

  const isDuration = type === 'duration';
  const isBet = type === 'bet';

  const isSlow = isDuration;
  const [auto, setAuto] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const interval = setInterval((_) => {
      if (auto) {
        setTimeout(() => {
          if (isAdd) onPlus();
          else onMinus();
        }, 40);
      }
    }, 40);
    return (_) => clearInterval(interval);
  });

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 200);
  }, [value]);

  return (
    <div
      className={cn('is-inline-flex', styles.customStepper, btnStyle, {
        [styles.animationOff]: animationOff
      })}
    >
      <button
        className={cn('button', styles.button)}
        onClick={onMinus}
        onMouseDown={!isSlow ? onStartMinus : undefined}
        onMouseUp={!isSlow ? onEnd : undefined}
        disabled={value <= min}
      >
        <i className={cn('icon-minus', iconStyle)}></i>
      </button>
      <label
        className={cn(styles[type], {
          [styles.text18]: value >= 1000
        })}
      >
        <span
          className={cn({
            [styles.animate]: animate
          })}
        >
          {value}
        </span>
      </label>
      <button
        className={cn('button', styles.button)}
        onClick={onPlus}
        onMouseDown={!isSlow ? onStartPlus : undefined}
        onMouseUp={!isSlow ? onEnd : undefined}
        disabled={value >= max}
      >
        <i className={cn('icon-plus', iconStyle)}></i>
      </button>
      {isDuration && <div className={cn(styles['c-duration'])}>Phút</div>}
      {isBet && (
        <div className={cn(styles['c-bet'])}>
          <Coin size="normal" />
        </div>
      )}
    </div>
  );
};

export default Stepper;
