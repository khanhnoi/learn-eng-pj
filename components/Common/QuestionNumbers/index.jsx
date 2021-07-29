import styles from './styles.module.scss';
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import _ from 'lodash';
import QuestionNumberButton from '../QuestionNumberButton';

/**
 *
 * @param {string} type in [default, answered, active, right, wrong, active-answer ]
 * @param {function} onSelected - function
 */
const QuestionNumbers = ({
  numberOfAnswers = 0,
  questions = [],
  onSelected,
  className,
  label,
  setNumberOfAnswers,
  forwardRef,
  ...props
}) => {
  const totalQuestions = questions.length;
  const isLarge = questions.length <= 20;
  const questionGroups = _.chunk(questions, isLarge ? 4 : 6);

  const onClick = (questionNo) => {
    onSelected && onSelected(questionNo);
  };

  const [answeredCount, setAnsweredCount] = useState(0);
  forwardRef && forwardRef(setAnsweredCount);

  useEffect(() => {
    setAnsweredCount(numberOfAnswers);
  }, [numberOfAnswers]);

  return (
    <div className={cn(className, styles.questionNumber)} {...props}>
      <h5
        className={cn('has-text-centered text-is-16', styles.title)}
      >{`${label}: ${answeredCount}/${totalQuestions} câu`}</h5>
      <div className={cn(styles.questionsContainer)}>
        {questionGroups &&
          questionGroups.map((questionGroup, index) => {
            return (
              <div className="columns is-flex-mobile" key={`qgroup-${index}`}>
                {questionGroup.map((x) => (
                  <div
                    key={`qnumber-${x.number}`}
                    className={cn(
                      isLarge
                        ? 'column is-3 is-3-mobile is-flex has-justify-center'
                        : 'column is-2 is-2-mobile is-flex has-justify-center',
                      x.isHidden && 'is-hidden'
                    )}
                  >
                    <QuestionNumberButton
                      type={x.type}
                      size={isLarge ? 'medium' : 'small'}
                      onSelected={onClick}
                    >
                      {x.number}
                    </QuestionNumberButton>
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default QuestionNumbers;
