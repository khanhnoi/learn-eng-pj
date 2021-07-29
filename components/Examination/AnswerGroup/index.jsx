import React, { useState } from 'react';
import AnswerItem from '../AnswerItem';
import { useEffect } from 'react';

const AnswerGroup = ({ data = {}, onSelected, quizId }) => {
  const onClick = (answer) => {
    const newAnswers = answers.map((x) => ({
      ...x,
      isSelected: x.answerName === answer.answerName
    }));
    setAnswers(newAnswers);
    onSelected && onSelected(answer);
  };

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const defaultAnswers = ['A', 'B', 'C', 'D'].map((x, index) => {
      return {
        answerName: x,
        answerIndex: index + 1,
        answer: data[`answer${index + 1}`],
        answerImage: data[`answer${index + 1}Image`],
        isSelected: data.answerName === x,
        id: x.id
      };
    });
    setAnswers(defaultAnswers);
  }, [data]);

  return (
    <div>
      {answers?.map((x, index) => {
        if (!x.answer) return <></>;
        return (
          <AnswerItem
            className="animate__animated animate__fadeIn"
            style={{ animationDelay: `${index * 100 + 600}ms` }}
            key={`answer-item-${quizId}${index}`}
            isSelected={x.isSelected}
            onSelected={() =>
              onClick({
                id: x.id,
                answer: x.answer,
                answerImage: x.answerImage,
                answerName: x.answerName,
                answerIndex: x.answerIndex
              })
            }
            answerName={x.answerName}
            data={{ id: x.id, answer: x.answer, answerImage: x.answerImage }}
          />
        );
      })}
    </div>
  );
};

export default AnswerGroup;
