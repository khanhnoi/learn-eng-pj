import React from 'react';
import AnswerItem from '../AnswerItem';
import { renderCodeMaxJax } from '../../../utils';

const AnswerGroup = ({ data = {}, quizId }) => {
  const answers = ['A', 'B', 'C', 'D'].map((x, index) => {
    return {
      answerName: x,
      answerIndex: index + 1,
      answer: data[`answer${index + 1}`],
      answerImage: data[`answer${index + 1}Image`],
      isSelected: data.answerName === x,
      id: x.id
    };
  });

  const currentUser = data.participant.find(
    (x) => x.participantId === data.participantId
  );

  const getAnswerType = (answerIndex) => {
    if (answerIndex === data.correctAnswer) {
      return 'correct';
    }
    if (currentUser.answer && currentUser.answer === answerIndex) {
      return 'wrong';
    }
    if (!currentUser.answer) {
      return 'noAnswer';
    }
    return 'default';
  };

  const getUsers = (answerIndex) => {
    return data.participant
      .filter(
        (p) =>
          p.answer === answerIndex && p.participantId !== data.participantId
      )
      .map((u) => {
        const user = data.participants.find((x) => x.id === u.participantId);
        return { ...u, ...user };
      });
  };

  return (
    <div>
      {answers.map((x, index) => {
        if (!x.answer) return <></>;
        return (
          <AnswerItem
            className="animate__animated animate__fadeIn"
            style={{ animationDelay: `${index * 100 + 600}ms` }}
            key={`answer-item-${quizId}${index}`}
            type={getAnswerType(index + 1)}
            answerName={x.answerName}
            users={getUsers(index + 1)}
            data={{ id: x.id, answer: x.answer, answerImage: x.answerImage }}
          />
        );
      })}
      {data.guidance && (
        <div
          className="animate__animated animate__fadeIn has-text-weight-bold"
          style={{ animationDelay: `${4 * 100 + 600}ms` }}
        >
          <span>Hướng dẫn: </span>
          {renderCodeMaxJax(data.guidance)}
        </div>
      )}
    </div>
  );
};

export default AnswerGroup;
