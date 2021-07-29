import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Input = ({
  size,
  type,
  placeholder,
  value,
  onValueChange,
  iconName,
  isIconRight,
  isError,
  label,
  className,
  isTextarea,
  variant,
  onIconClick,
  ...props
}) => {
  return (
    <div className={cn('is-inline-flex', styles.inputContainer)}>
      <div className={cn('has-margin-bottom-2', styles.label)}>
        <label htmlFor="input">{label}</label>
      </div>
      {isTextarea ? (
        <textarea
          id="input"
          type={type}
          value={value}
          onChange={onValueChange}
          placeholder={placeholder}
          className={cn(className, styles.textarea, styles[variant], {
            [styles.error]: !!isError
          })}
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onValueChange}
          placeholder={placeholder}
          className={cn(
            className,
            styles.input,
            styles[size],
            styles[variant],
            {
              [styles.hasIcon]: !!iconName,
              [styles.iconRight]: !!isIconRight,
              [styles.error]: !!isError
            }
          )}
          {...props}
        />
      )}

      {iconName && (
        <i
          onClick={onIconClick}
          onKeyPress={onIconClick}
          role="button"
          tabIndex={0}
          className={cn(iconName, styles.icon, {
            [styles.right]: !!isIconRight
          })}
        ></i>
      )}
    </div>
  );
};

Input.defaultProps = {
  size: 'normal',
  type: 'text',
  placeholder: '',
  onValueChange: (evt) => {},
  value: '',
  iconName: '',
  isIconRight: false,
  isError: false,
  label: ''
};

export default Input;
