import styles from './styles.module.scss';
import React from 'react';
import cn from 'classnames';
import withRippleEffect from '../../HOCComponent/WithRippleEffect';

/**
 * @param {string} size - in [small, medium, large, xlarge, xxlarge]
 * @param {string} leftIconName - icon name
 * @param {string} rightIconName - icon name
 * @param {boolean} hasShadow - boolean
 * @param {boolean} outline - boolean
 * @param {boolean} textPrimary - boolean
 */
const Button = ({
  onClick,
  leftIcon,
  rightIcon,
  leftIconName,
  rightIconName,
  className,
  containerClassName,
  children,
  hasShadow,
  secondary,
  outline,
  textPrimary,
  iconStyle,
  outlineGradient,
  size = 'medium',
  ...props
}) => {
  const shadowStyle = hasShadow && styles.shadow;
  const btnStyle = cn(
    styles[`btn-${size}`],
    secondary && styles.secondary,
    outline && styles.outline,
    textPrimary && styles.textPrimary,
    shadowStyle
  );
  const leftIconStyle = cn(
    styles[`icon-${size}`],
    styles[`mr-${size}`],
    iconStyle,
    styles.leftIcon
  );
  const rightIconStyle = cn(
    styles[`icon-${size}`],
    styles[`ml-${size}`],
    iconStyle,
    styles.rightIcon
  );
  return (
    <div
      className={cn(
        'is-inline-flex',
        styles.customButton,
        {
          [styles.outlineGradient]: outlineGradient
        },
        containerClassName
      )}
    >
      <button
        className={cn('button', btnStyle, className)}
        aria-label={'button'}
        onClick={onClick}
        {...props}
      >
        {leftIcon}
        {leftIconName && <i className={cn(leftIconName, leftIconStyle)}></i>}
        <span>{children}</span>
        {rightIconName && <i className={cn(rightIconName, rightIconStyle)}></i>}
        {rightIcon}
      </button>
    </div>
  );
};

export default withRippleEffect(Button);
