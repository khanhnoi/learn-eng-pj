import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import cn from 'classnames';
import _ from 'lodash';

import {
  getCompetition,
  getCompetitionResult
} from '../../services/competition';
import { reviewQuiz } from '../../services/quiz';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import styles from './styles.module.scss';
import Spinner from '../Common/Spinner';
import Button from '../Common/Button';
import QuestionNumbers from '../Common/QuestionNumbers';
import QuestionItem from '../Examination/QuestionItem';
import AnswerGroup from './AnswerGroup';
import ReportQuestion from '../Examination/ReportQuestion';
import {
  getBattle,
  getBattleResult,
  getBattleParticipant
} from '../../services/battle';
import { getChallengeResult } from '../../services/challenge';

const ExaminationReview = ({ onExit, type }) => {
  const { user } = User.useContainer();
  let carouselRef = null;
  let questionNumbersRef = null;
  const [loading, setLoading] = useState(false);

  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);
  const onNextQuestion = () => {
    const position = currentQuestionNo + 1;
    setCurrentQuestionNo(position);
    onQuestionNumberSelected(position);
    moveToSlide(position);
  };
  const onPreviousQuestion = () => {
    const position = currentQuestionNo - 1;
    setCurrentQuestionNo(position);
    onQuestionNumberSelected(position);
    moveToSlide(position);
  };
  const moveToSlide = (position) => {
    carouselRef.moveTo(position - 1);
  };

  const onReport = () => {
    setIsReportModalOpen(true);
  };
  const onReportSubmit = async (data) => {
    try {
      await reviewQuiz(quizzes[currentQuestionNo - 1].id, data);
      setIsReportModalOpen(false);
      toast.success('Chúng tôi đã ghi nhận báo lỗi của bạn. Cảm ơn!');
    } catch (error) {
      handleError(error);
    }
  };

  const [questionData, setQuestionData] = useState([]);
  const getQuestionData = (quizzes) => {
    return quizzes.map((x, index) => ({
      id: x.id,
      type: getQuestionButtonType(x, index + 1),
      number: index + 1,
      status: x.status
    }));
  };

  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  const onQuestionNumberSelected = (questionNo) => {
    const questions = questionData.map((x) => ({
      ...x,
      type: `${questionNo === x.number ? 'active-answer-' : ''}${
        x.status === 'correct' ? 'right' : 'wrong'
      }`
    }));
    setQuestionData(questions);
    setCurrentQuestionNo(questionNo);
    moveToSlide(questionNo);
  };

  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);

  const onGetMatch = async (id, participantId) => {
    try {
      setLoading(true);
      let competition = {};
      let requests = [];
      let totalQuestions = 0;
      let participantsData = [];
      switch (type) {
        case 'competition':
          competition = (await getCompetition(id)).data;
          totalQuestions = competition.totalQuestions;
          requests = [...Array(totalQuestions / 10).keys()].map((x, index) =>
            getCompetitionResult(competition.id, {
              fromNo: index * 10 + 1,
              toNo: index * 10 + 10
            })
          );
          break;
        case 'battle':
          competition = (await getBattle(id)).data;
          participantsData = (await getBattleParticipant(id)).data;
          participantsData = participantsData?.map((x) => ({
            ...x,
            id: x.participantId
          }));
          totalQuestions = competition.totalQuestions;
          requests = [...Array(totalQuestions / 10).keys()].map((x, index) =>
            getBattleResult(competition.id, {
              fromNo: index * 10 + 1,
              toNo: index * 10 + 10
            })
          );
          break;
        case 'challenge':
          const params = { fromNo: 1, toNo: 50, participantId };
          requests = (await getChallengeResult(id, params)).data;

          break;
        default:
          break;
      }

      let quizzesData = [];
      let participants = [];
      let users = [];
      if (type !== 'challenge') {
        const questionArr = await Promise.all(requests);
        quizzesData = _.flatten(questionArr.map((q) => q.data.quizzes));
        participants =
          type === 'competition'
            ? _.unionBy(
                _.flatten(questionArr.map((q) => q.data.participants)),
                (x) => x && x.id
              )
            : participantsData;
        users = questionArr.length > 0 ? participants : [];
      } else {
        quizzesData = requests?.quizzes;
        participants = requests?.participants;
        users = participants;
      }

      const answerNames = ['A', 'B', 'C', 'D'];
      const quizzes =
        (quizzesData &&
          quizzesData.map((quizData, index) => {
            const quiz = quizData.quiz;
            const myParticipant = participants.find(
              (x) => x.userId === user.id
            );
            questionNumbersRef(myParticipant.score);
            const myQuizPart = _.find(
              quizData.participant,
              (p) => p.participantId === myParticipant.id
            );
            return {
              ...quiz,
              participantId: myQuizPart.participantId,
              participant: quizData.participant,
              participants: users,
              number: index + 1,
              id: quiz.id,
              type: `${index === 0 ? 'active-answer-' : ''}${
                myQuizPart.status === 'correct' ? 'right' : 'wrong'
              }`,
              answerName: answerNames[(myQuizPart.answer || 0) - 1],
              answerIndex: (myQuizPart.answer || 0) - 1,
              status: myQuizPart.status
            };
          })) ||
        [];
      setQuizzes(quizzes);
      setQuestionData(getQuestionData(quizzes));
      setDelayLoading(false, 1000);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const setDelayLoading = (isLoading, timeout) => {
    setTimeout(() => {
      setLoading(isLoading);
    }, timeout);
  };

  const getQuestionButtonType = (quiz, questionNo) => {
    return `${currentQuestionNo === questionNo ? 'active-answer-' : ''}${
      quiz.status === 'correct' ? 'right' : 'wrong'
    }`;
  };

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const onReportModalClose = () => {
    setIsReportModalOpen(false);
  };

  useEffect(() => {
    const { id, participantId } = router.query;
    if (user.id) {
      onGetMatch(id, participantId);
    }
  }, [user.id]);

  const QuestionAnswers = quizzes.map((quiz, index) =>
    index + 1 !== currentQuestionNo ? (
      <></>
    ) : (
      <Quiz quiz={quiz} key={`quizz${quiz.id}`} />
    )
  );

  return (
    <>
      <Spinner enable={loading}></Spinner>
      <div className={cn('columns has-margin-y-0', styles.createCompetition)}>
        <div className="column is-9 has-padding-y-0">
          <div className={styles.container}>
            <div
              className={cn(
                'has-item-center',
                styles.header,
                'has-padding-bottom-0 is-flex has-justify-between'
              )}
            >
              <div className={styles.questionName}>Câu {currentQuestionNo}</div>
              <div className={styles.alertButtonContainer}>
                <Button
                  leftIconName="icon-alert-triangle"
                  outline
                  iconStyle={styles.alertIcon}
                  size="medium"
                  className="has-margin-bottom-4 has-margin-top-4"
                  onClick={onReport}
                >
                  Báo lỗi
                </Button>
              </div>
            </div>
            {QuestionAnswers.length > 0 && (
              <Carousel
                ref={(elm) => (carouselRef = elm)}
                style={{ background: 'white' }}
                class="carousel-container"
                showArrows={false}
                showIndicators={false}
                showStatus={false}
                showThumbs={false}
                swipeable={false}
              >
                {QuestionAnswers}
              </Carousel>
            )}

            <div
              className={cn(
                styles.footer,
                'columns has-item-center has-justify-between'
              )}
            >
              <Button
                onClick={onPreviousQuestion}
                size="medium"
                outline
                disabled={currentQuestionNo === 1}
                leftIconName="icon-arrow-left"
              >
                Câu trước
              </Button>
              <Button
                onClick={onNextQuestion}
                size="medium"
                outline
                disabled={currentQuestionNo >= quizzes.length}
                rightIconName="icon-arrow-right"
              >
                Câu tiếp
              </Button>
            </div>
          </div>
        </div>
        <div className="column is-3 right-sidebar-layout has-text-center has-item-center has-justify-center">
          <QuestionNumbers
            forwardRef={(e) => {
              questionNumbersRef = e;
            }}
            className={styles.questionNumbers}
            onSelected={onQuestionNumberSelected}
            label={'Số câu đúng'}
            questions={questionData}
            numberOfAnswers={numberOfAnswers}
          />
          <div className={cn('has-text-center', styles.footerSidebar)}>
            <Button
              onClick={onExit}
              className={styles.btnFinish}
              outlineGradient
              size="large"
            >
              THOÁT RA
            </Button>
          </div>
        </div>
      </div>
      <ReportQuestion
        onClose={onReportModalClose}
        onReport={onReportSubmit}
        isOpen={isReportModalOpen}
      />
    </>
  );
};

const Quiz = ({ quiz }) => {
  if (!quiz) return <></>;
  return (
    <div className={styles.content}>
      <div className={cn('has-margin-left-4 has-margin-right-4', styles.body)}>
        <div className="columns has-margin-0 has-text-left">
          <div
            className={cn(
              'column has-padding-4',
              quiz.questionImage ? 'is-8' : 'is-12'
            )}
          >
            <QuestionItem
              className="has-margin-bottom-5"
              data={{
                question: quiz.question,
                questionImage: quiz.questionImage,
                id: quiz.id
              }}
            />
            <AnswerGroup
              onSelected={() => {}}
              quizId={quiz.id}
              answerName={quiz.answerName}
              data={quiz}
            />
          </div>
          {quiz.questionImage && (
            <div className="column is-4 has-padding-4">
              <img src={quiz.questionImage} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExaminationReview;
