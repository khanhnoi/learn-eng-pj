import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';
import Spinner from '../Common/Spinner';
import Button from '../Common/Button';
import QuestionNumbers from '../Common/QuestionNumbers';
import QuestionItem from './QuestionItem';
import AnswerGroup from './AnswerGroup';
import ReportQuestion from './ReportQuestion';
import {
  getQuizzes,
  getCompetitionParticipant
} from '../../services/competition';
import { reviewQuiz } from '../../services/quiz';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import ConfirmModal from './ConfirmModal';
import PromptRouteChange from '../Common/PromptRouteChange';
import moment from 'moment';

/**
 *
 * @param {string} type - competition | battle | challenge
 */
const Examination = ({
  forwardRef,
  type,
  onSubmitQuizzes,
  loading,
  setLoading,
  updateProgress,
  animationOff,
  matchInfo
}) => {
  const { user } = User.useContainer();

  let carouselRef = null;
  let questionNumbersRef = null;

  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);
  const [reachLastQuestion, setReachLastQuestion] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const onNextQuestion = () => {
    const position = currentQuestionNo + 1;
    setCurrentQuestionNo(position);
    onQuestionNumberSelected(position);
    checkSkipQuestion(currentQuestionNo);
    moveToSlide(position);
  };
  const onPreviousQuestion = () => {
    const position = currentQuestionNo - 1;
    setCurrentQuestionNo(position);
    onQuestionNumberSelected(position);
    checkSkipQuestion(currentQuestionNo);
    moveToSlide(position);
  };

  useEffect(() => {
    if (reachLastQuestion) setShowTooltip(true);
  }, [reachLastQuestion]);

  const handleCloseTooltip = () => {
    if (reachLastQuestion) setShowTooltip(false);
  };

  const moveToSlide = (position) => {
    if (!animationOff) carouselRef.moveTo(position - 1);
  };

  const checkSkipQuestion = (questionNo) => {
    const index = questionNo - 1;
    const quiz = quizzes[index];
    if (!quiz.answerName) {
      quizzes[index].status = 'skipped';
    }
    setQuizzes(quizzes);
  };

  const onReport = () => {
    setIsReportModalOpen(true);
  };
  const onReportSubmit = async (data) => {
    try {
      setLoading(true);
      await reviewQuiz(quizzes[currentQuestionNo - 1].id, data);
      setIsReportModalOpen(false);
      toast.success('Chúng tôi đã ghi nhận báo lỗi của bạn. Cảm ơn!');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishCompetition = async (hasNavigation = false) => {
    // setLoading(true);
    const answers = quizzes.map((q) => ({
      participantQuizId: q.participantQuizId,
      answer: q.answerIndex,
      status: q.status
    }));
    const body = { answers };

    onSubmitQuizzes(
      competition.id,
      participant.participantId,
      body,
      hasNavigation
    );
    setOnFinish(false);
  };

  const [questionData, setQuestionData] = useState([]);
  const getQuestionData = (quizzes) => {
    return quizzes.map((x, index) => ({
      id: x.id,
      type: getQuestionButtonType(x, index + 1),
      number: index + 1,
      isHidden: x.isHidden
    }));
  };

  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  const onQuestionNumberSelected = (questionNo) => {
    const questions = questionData.map((x, index) => ({
      ...x,
      type:
        questionNo === x.number
          ? 'active'
          : quizzes[index].answerName
          ? 'answered'
          : 'default',
      isHidden: questionNo === x.number ? false : x.isHidden
    }));
    setQuestionData(questions);
    setCurrentQuestionNo(questionNo);
    moveToSlide(questionNo);
  };

  const router = useRouter();
  const [competition, setCompetition] = useState({});
  const [participant, setParticipant] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const onUpdateMatch = async (matchInfo) => {
    const participants = matchInfo?.participants;
    const participant = participants.find((x) => x.userId === user.id) || {};

    setParticipant(participant);
    setCompetition(matchInfo);
    try {
      setLoading(false);
      const totalQuestions = matchInfo.totalQuestions;
      await onGetQuizzes(totalQuestions, participant.participantId);
      setDelayLoading(false, 1000);
      setAllowRoute(false);
    } catch (error) {
      handleError(error);
      Router.replace(`/${type}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (matchInfo) {
      onUpdateMatch(matchInfo);
    }
  }, [matchInfo]);

  const onGetQuizzes = async (totalQuestions, participantId) => {
    try {
      const requests = [...Array(totalQuestions / 10).keys()].map((x) =>
        getQuizzes(participantId, { skip: x * 10, take: 10 })
      );
      const questionArr = await Promise.all(requests);
      const quizzesData = _.flatten(questionArr.map((x) => x.data));
      const quizzes =
        (quizzesData &&
          quizzesData.map((quiz, index) => {
            const x = quiz.quiz;
            return {
              participantQuizId: quiz.id,
              ...x,
              number: index + 1,
              id: x.id,
              type: index === 0 ? 'active' : 'default',
              answerName: '',
              answerIndex: 0,
              status: 'unanswered',
              isHidden: index !== 0
            };
          })) ||
        [];
      setQuizzes(quizzes);
      setQuestionData(getQuestionData(quizzes));
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (currentQuestionNo >= quizzes.length && quizzes.length > 0) {
      setReachLastQuestion(true);
    }
  }, [currentQuestionNo, quizzes]);

  const setDelayLoading = (isLoading, timeout) => {
    setTimeout(() => {
      setLoading(isLoading);
    }, timeout);
  };

  const getQuestionButtonType = (quiz, questionNo) => {
    return currentQuestionNo === questionNo
      ? 'active'
      : quiz.answerName
      ? 'answered'
      : 'default';
  };

  const onAnswerSelected = (quizeId, answer) => {
    const quiz = quizzes.find((x) => x.id === quizeId);
    quiz.answerName = answer.answerName;
    quiz.answerIndex = answer.answerIndex;
    quiz.status = 'answered';
    const index = quizzes.findIndex((x) => x.id === quizeId);
    quizzes[index] = quiz;
    const numberOfAnswers = quizzes.filter((x) => x.answerName).length;
    questionNumbersRef(numberOfAnswers);
    updateProgress(competition.id, participant.userId, numberOfAnswers);
  };

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const onReportModalClose = () => {
    setIsReportModalOpen(false);
  };

  const [allowRoute, setAllowRoute] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [onFinish, setOnFinish] = useState(false);
  const onConfirmModalOk = () => {
    setAllowRoute(true);
    setIsReportModalOpen(false);
    setOnFinish(true);
  };

  // Timeout
  forwardRef &&
    forwardRef(() => {
      setAllowRoute(true);
      setOnFinish(true);
    });

  useEffect(() => {
    if (onFinish) {
      // Last user, navigate to result
      if (isLastUser) onFinishCompetition();
      else onFinishCompetition(true);
      // Not last user, navigate to dashboard
    }
  }, [onFinish]);

  const onConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const [isLastUser, setIsLastUser] = useState(false);
  const onFinishClick = async () => {
    try {
      // setLoading(true);
      let participants = [];
      switch (type) {
        case 'competition':
          participants = (await getCompetitionParticipant(competition.id)).data;
          break;
        case 'battle':
          setIsConfirmModalOpen(true);
          return;
        case 'challenge':
          setIsConfirmModalOpen(true);
          setIsLastUser(true);
          return;
        default:
          break;
      }
      const isFinishedAll =
        participants.filter(
          (x) => x.userId !== user.id && x.status === 'started'
        ).length === 0;
      if (isFinishedAll) {
        setIsLastUser(true);
        setIsConfirmModalOpen(true);
      } else {
        setIsConfirmModalOpen(true);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  const getConfirmModalTitle = () => {
    switch (type) {
      case 'battle':
        return 'HOÀN THÀNH TRẬN ĐẤU';
      case 'competition':
        return 'HOÀN THÀNH CUỘC THÁCH ĐẤU';
      case 'challenge':
        return 'HOÀN THÀNH THỬ THÁCH';
      default:
        return '';
    }
  };

  const getConfirmModalDesc = () => {
    switch (type) {
      case 'battle':
        return 'Có vẻ như vẫn còn thời gian. Bạn có chắc chắn muốn hoàn thành trận đấu này không?';
      case 'competition':
        return 'Có vẻ như vẫn còn thời gian. Bạn có chắc chắn muốn hoàn thành cuộc thách đấu này không?';
      case 'challenge':
        return 'Bạn có chắc chắn muốn hoàn thành thử thách này không?';
      default:
        return '';
    }
  };

  const QuestionAnswers = (quizzes) => {
    return quizzes.map((quiz, index) =>
      index + 1 !== currentQuestionNo ? (
        <></>
      ) : (
        <Quiz
          key={`quizz${quiz.id}`}
          quiz={quiz}
          onAnswerSelected={onAnswerSelected}
        />
      )
    );
  };

  const quiz = quizzes.filter((quiz) => quiz.number === currentQuestionNo)[0];

  const endTime =
    matchInfo?.type === 'freedom'
      ? matchInfo?.expirationTime
      : matchInfo?.startTime;

  const endTimeofMatch = moment(endTime).add(
    matchInfo?.durationInSeconds,
    'seconds'
  );

  return (
    <>
      <PromptRouteChange
        message="Bạn có chắc chắn muốn rời khỏi trận đấu không?"
        allowRoute={allowRoute}
      />
      <Spinner enable={loading}></Spinner>
      <div className={cn('columns has-margin-y-0', styles.createCompetition)}>
        <div className={cn(styles.container, 'column is-9')}>
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
                onClick={onReport}
              >
                Báo lỗi
              </Button>
            </div>
          </div>
          {animationOff ? (
            <Quiz quiz={quiz} onAnswerSelected={onAnswerSelected} />
          ) : (
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
              {QuestionAnswers(quizzes)}
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
            {currentQuestionNo < quizzes.length && (
              <Button
                onClick={onNextQuestion}
                size="medium"
                outline
                textPrimary
                rightIcon={
                  <img
                    className={styles.nextIcon}
                    src={'/static/img/icons/icon-arrow-right.svg'}
                    alt="next icon"
                  />
                }
              >
                Câu tiếp
              </Button>
            )}
          </div>
        </div>
        <div className="column is-3 right-sidebar-layout has-text-center has-item-center has-justify-center">
          <QuestionNumbers
            forwardRef={(e) => {
              questionNumbersRef = e;
            }}
            className={styles.questionNumbers}
            onSelected={onQuestionNumberSelected}
            label={'Đã trả lời'}
            questions={questionData}
            numberOfAnswers={numberOfAnswers}
          />
          <div className={cn('has-text-center', styles.footerSidebar)}>
            {showTooltip && (
              <div
                className={cn(
                  styles.tooltip,
                  'animate__animated animate__zoomIn animate__faster'
                )}
              >
                Bạn ơi, nhớ trả lời tất cả câu hỏi và nhấn Hoàn thành để kết
                thúc trận đấu nhé!
                <button
                  className={cn('modal-close', styles.closetooltip)}
                  aria-label="close"
                  onClick={handleCloseTooltip}
                ></button>
              </div>
            )}

            <Button
              onClick={onFinishClick}
              className={styles.btnFinish}
              disabled={quizzes.length === 0}
              outlineGradient
              size="large"
            >
              HOÀN THÀNH
            </Button>
          </div>
        </div>
      </div>
      <ReportQuestion
        onClose={onReportModalClose}
        onReport={onReportSubmit}
        isOpen={isReportModalOpen}
      />
      <ConfirmModal
        onClose={onConfirmModalClose}
        onOk={onConfirmModalOk}
        title={getConfirmModalTitle()}
        description={getConfirmModalDesc()}
        isOpen={isConfirmModalOpen}
        warningType={type}
        battleType={matchInfo?.type}
        endTime={endTimeofMatch?.toISOString()}
      />
    </>
  );
};

const Quiz = ({ quiz, onAnswerSelected }) => {
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
              preventCopy
            />
            <AnswerGroup
              onSelected={(answer) => {
                onAnswerSelected(quiz.id, answer);
              }}
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

export default Examination;
