import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Router from 'next/router';
import _ from 'lodash';
import styles from './styles.module.scss';
import Button from '../Common/Button';
import Spinner from '../Common/Spinner';
import Stepper from '../Common/Stepper';
import CompetitionInfo from './CompetitionInfo';
import SubjectTag from '../Common/SubjectTag';
import QuestionLevel from '../Common/QuestionLevel';
import NumberOfQuestions from '../Common/NumberOfQuestions';
import { User } from '../../hooks/useUser';
import { handleError } from '../../utils';
import { createCompetition } from '../../services/competition';
import {
  DEFAULT_LEVELS_CONFIG,
  DEFAULT_GRADES_CONFIG,
  SUBJECT_PROPERTIES,
  LEVEL_PROPERTIES,
  MIN_GRADE,
  MAX_GRADE,
  COMPETITION_SCOPE
} from '../../constants';

const CompetitionConfiguration = ({ animationOff }) => {
  const { user } = User.useContainer();
  const [loading, setLoading] = useState(false);

  const defaultSubjects = SUBJECT_PROPERTIES.filter(
    (x) => x.id !== 7
  ).map((x) => ({ name: x.name, isSelected: false }));
  defaultSubjects[0].isSelected = true;

  const [subjects, setSubjects] = useState(defaultSubjects);
  const [subjectsConfig, setSubjectsConfig] = useState([]);
  const onSubjectClick = (subject) => {
    const newSubjects = subjects.map((x) => ({
      ...x,
      isSelected: subject === x.name
    }));
    setSubjects(newSubjects);
  };

  const [grade, setGrade] = useState(10);
  const [gradesConfig, setGradesConfig] = useState([]);
  const onGradeChange = (grade) => {
    setGrade(grade);
  };

  const [level, setLevel] = useState(LEVEL_PROPERTIES[1].name);
  const [levelsConfig, setLevelsConfig] = useState([]);
  const onLevelSelected = (value) => {
    setLevel(value);
  };

  const numberOfQuestions = [
    { key: 10, label: 10 },
    { key: 20, label: 20 },
    { key: 30, label: 30 },
    { key: 50, label: 50 }
  ];
  const [numberOfQuestion, setNumberOfQuestion] = useState(30);
  const onNumberOfQuestionSelected = (value) => {
    setNumberOfQuestion(value);
  };

  const [duration, setDuration] = useState(30);
  const onDurationChange = (duration) => {
    setDuration(duration);
  };

  const [bet, setBet] = useState(10);

  const onQuit = () => {
    Router.replace('/competition');
  };

  const onCreateCompetition = async () => {
    try {
      setLoading(true);
      const request = {
        subjectId: subjectsConfig.find(
          (x) => subjects.find((x) => x.isSelected).name === x.name
        ).id,
        gradeId: gradesConfig.find((x) => x.name === `${grade}`).id,
        levelId: levelsConfig.find((x) => x.name === level).id,
        durationInSeconds: duration * 60,
        totalQuestion: numberOfQuestion,
        bet: bet,
        userIds: participants.map((x) => x.id),
        scope: COMPETITION_SCOPE
      };
      const res = await createCompetition(request);

      // Clear storage to prevent user comeback
      localStorage.setItem('competitionInfo', '');

      const competitionId = res.data.id;
      const token = res.data.publicKey;
      Router.replace(`/competition-lobby/${competitionId}?token=${token}`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      setLeftAnimate(!animationOff && 'animate__backOutLeft');
      setRightAnimate(!animationOff && 'animate__backOutRight');
    }
  };
  // const { competitionConfig } = Participant.useContainer();
  const [participants, setParticipants] = useState([]);
  const [competitionConfig, setCompetitionConfig] = useState({});
  useEffect(() => {
    const competitionInfo = localStorage.getItem('competitionInfo');
    if (competitionInfo) {
      setCompetitionConfig(JSON.parse(competitionInfo));
    } else {
      Router.replace('/competition');
    }

    return () => {
      localStorage.setItem('competitionInfo', '');
    };
  }, []);

  const getData = () => {
    try {
      setLoading(true);
      setSubjectsConfig(SUBJECT_PROPERTIES);
      setLevelsConfig(DEFAULT_LEVELS_CONFIG);
      setGradesConfig(DEFAULT_GRADES_CONFIG);
      setInitialData(user);
      const users = competitionConfig.participants.map((x) => ({
        id: x.id,
        displayName: x.displayName,
        username: x.username,
        avatar: x.avatar
      }));
      setParticipants(users);
      setBet(competitionConfig.bet);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Get data when competitionConfig ready
  useEffect(() => {
    if (!_.isEmpty(competitionConfig)) {
      getData();
    }
  }, [competitionConfig]);

  const setInitialData = (user) => {
    const { subjects: favoriteSubjects, grade } = user;
    grade && setGrade(parseInt(grade.name));
    if (favoriteSubjects && favoriteSubjects.length > 0) {
      const activeSubject = favoriteSubjects[0].name;
      const newSubjects = subjects.map((x) => ({
        ...x,
        isSelected: activeSubject.toLowerCase() === x.name
      }));
      setSubjects(newSubjects);
    }
  };

  const [leftAnimate, setLeftAnimate] = useState(
    !animationOff && 'animate__backInLeft'
  );
  const [rightAnimate, setRightAnimate] = useState(
    !animationOff && 'animate__backInRight'
  );

  return (
    <>
      <Spinner enable={loading}></Spinner>
      <div className={cn('columns has-margin-y-0', styles.container)}>
        <div
          className={cn(
            `column is-2 col-sidebar-left animate__animated ${leftAnimate}`,
            styles.leftCol
          )}
        >
          <CompetitionInfo
            users={participants}
            totalBet={bet}
          ></CompetitionInfo>
        </div>
        <div className="column is-7 is-offset-2">
          <div className={cn(styles.configuration, 'competition-container')}>
            <div className={styles.header}>
              <Button
                outline
                size="medium"
                leftIconName="icon-arrow-left"
                onClick={onQuit}
              >
                THOÁT
              </Button>
            </div>
            <div className="has-text-centered">
              <div className={cn('columns', styles.stepperContainer)}>
                <div className="column">
                  <h6 className="text-is-18 has-text-weight-bold">
                    Thời lượng:
                  </h6>
                  <Stepper
                    type="duration"
                    min={15}
                    max={90}
                    step={15}
                    onChange={onDurationChange}
                    value={duration}
                    animationOff={animationOff}
                  ></Stepper>
                </div>
                <div className="column">
                  <h6 className="text-is-18 has-text-weight-bold">Chọn lớp:</h6>
                  <Stepper
                    type="grade"
                    min={MIN_GRADE}
                    max={MAX_GRADE}
                    step={1}
                    onChange={onGradeChange}
                    value={grade}
                    animationOff={animationOff}
                  ></Stepper>
                </div>
              </div>

              <div className={cn(styles.selectSubjectContainer)}>
                <h6
                  className={cn(
                    'text-is-18 has-margin-top-2 has-margin-bottom-4 has-text-weight-bold',
                    styles.selectSubject
                  )}
                >
                  Chọn môn học:
                </h6>
                <div className="">
                  {subjects.map((x) => {
                    return (
                      <SubjectTag
                        key={`subtag${x.name}`}
                        onSubjectClick={onSubjectClick}
                        subject={x.name}
                        selected={x.isSelected}
                        className="has-margin-right-4"
                        animationOff={animationOff}
                      ></SubjectTag>
                    );
                  })}
                </div>
              </div>

              <div className={cn('columns', styles.sliderContainer)}>
                <div className="column is-6">
                  <h6 className="text-is-18 has-margin-top-0 has-margin-bottom-2 has-text-weight-bold">
                    Chọn độ khó:
                  </h6>
                  <QuestionLevel
                    value={level}
                    onSelected={onLevelSelected}
                    animationOff={animationOff}
                  />
                </div>
                <div className="column is-6">
                  <h6 className="text-is-18 has-margin-top-0 has-margin-bottom-2 has-text-weight-bold">
                    Số câu hỏi
                  </h6>
                  <NumberOfQuestions
                    values={numberOfQuestions}
                    value={numberOfQuestion}
                    onSelected={onNumberOfQuestionSelected}
                    animationOff={animationOff}
                  />
                </div>
              </div>

              <div>
                <Button
                  size="xlarge"
                  hasShadow
                  disabled={participants.length === 0}
                  onClick={onCreateCompetition}
                  rightIconName="icon-arrow-bold-right"
                >
                  BẮT ĐẦU NGAY
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            `column is-3 col-sidebar-right animate__animated ${rightAnimate}`
          )}
        >
          <div className={cn('has-text-centered', styles.tipsContainer)}>
            <div
              className={cn(
                'has-text-grey has-text-weight-bold has-margin-bottom-24'
              )}
            >
              Có lẽ bạn đã biết:
            </div>
            <div className={cn(styles.number, 'has-margin-bottom-4')}>1</div>
            <div className={cn('is-flex')}>
              <img src="/static/img/icons/icon-friends.svg" alt="friends" />
              <div
                className={cn(
                  styles.text,
                  'has-text-weight-medium has-text-left'
                )}
              >
                Bạn có thể bắt đầu cuộc thách đấu sớm ngay khi có 1 đối thủ vào
                phòng chờ.
              </div>
            </div>
            <div className="has-margin-bottom-5"></div>
            <div className={cn(styles.number, 'has-margin-bottom-4')}>2</div>
            <div className={cn('is-flex')}>
              <img src="/static/img/icons/icon-medal.svg" alt="medal" />
              <div
                className={cn(
                  styles.text,
                  'has-text-weight-medium has-text-left'
                )}
              >
                Hoàn thành xong bài thi sớm sẽ tăng cơ hội chiến thắng cho bạn.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompetitionConfiguration;
