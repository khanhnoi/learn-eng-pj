import styles from './styles.module.scss';
import React from 'react';
import cn from 'classnames';

/**
 *
 * @param {number} step - step number
 * @param {array} values - array with [{step, label}]
 */
const VerticalSteps = ({ values, step, className, ...props }) => {
  // TODO: option for background color
  return (
    <div
      className={cn('is-inline-flex', styles.verticalSteps, className)}
      {...props}
    >
      <ul className="steps is-vertical has-gaps">
        {values &&
          values.map((x) => {
            const isCurrentStep = x.step === step;
            const isNotFinished = x.step > step;
            return (
              <li
                className={cn('steps-segment', isCurrentStep && 'is-active')}
                key={`cstep-${x.step}`}
              >
                <span
                  href="#"
                  className={cn('steps-marker', styles.stepMarker)}
                >
                  {x.step}
                </span>
                <div className={styles.content}>
                  <p
                    className={cn(
                      'is-size-16',
                      isNotFinished && styles.inactive
                    )}
                  >
                    {x.label}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default VerticalSteps;
