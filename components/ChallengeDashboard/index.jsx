import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import LevelTag from '../Common/LevelTag';
import Router from 'next/router';
import Spinner from '../Common/Spinner';
import Coin from '../Common/Coin';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
  SUBJECT_PROPERTIES,
  DEFAULT_GRADE,
  SUBJECT_ORDER_CHALLENGES
} from '../../constants';
import { useEffect } from 'react';
import { getMyChallenges, getMyChallengeStats } from '../../services/challenge';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import _ from 'lodash';

export const ChallengeDashboard = ({ animationOff }) => {
  const { user } = User.useContainer();
  const [stats, setStats] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState('');
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleJoinChallenge = (challengeId) => {
    Router.push(`/challenge/${challengeId}`);
  };

  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState([]);
  const handleGetMyChallenges = async () => {
    const subjectId = SUBJECT_PROPERTIES.filter(
      (subject) => subject.name === selectedSubject
    )[0]?.id;

    try {
      const res = await getMyChallenges({
        levelId: [1, 2, 3],
        subjectId,
        gradeId: user?.grade?.id ?? DEFAULT_GRADE
      });

      setSubjectData(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMyStats = async () => {
    try {
      const res = await getMyChallengeStats({
        gradeId: user?.grade?.id ?? DEFAULT_GRADE
      });

      const sortedSubjects = SUBJECT_ORDER_CHALLENGES.map((x) =>
        res?.data?.find((y) => y.subject === x.name)
      );

      const formattedSubjects = _.compact(sortedSubjects);
      setSelectedSubject(formattedSubjects[0]?.subject);
      setStats(formattedSubjects);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSubject) {
      handleGetMyChallenges();
      setSubjectData([]);
    }
  }, [selectedSubject]);

  useEffect(() => {
    handleGetMyStats();
  }, []);

  const quote = SUBJECT_PROPERTIES.find((item) => item.name === selectedSubject)
    ?.quote;

  return (
    <>
      <Spinner enable={loading}></Spinner>
      <div className={cn('columns has-margin-y-0', styles.challengeContainer)}>
        <div className="column is-10 is-offset-1 has-padding-y-0">
          <div className="columns is-variable is-6 has-margin-y-0">
            <div className={cn('column is-3', styles.subjectsContainer)}>
              <SubjectSelector
                data={stats}
                onSelect={handleSelectSubject}
                selectedSubject={selectedSubject}
                animationOff={animationOff}
              />
            </div>
            <div className="column is-9">
              <div
                className="has-text-centered has-text-weight-bold"
                style={{ marginTop: '40px', marginBottom: '12px' }}
              >
                {stats.length === 0
                  ? 'Không có gói câu hỏi phù hợp với cấp độ hiện tại của bạn. Quay lại sau bạn nhé!!'
                  : quote}
              </div>
              <div className={styles.questionPackagesContainer}>
                <QuestionLevels
                  data={subjectData}
                  onSelectedQuestionPackage={handleJoinChallenge}
                  animationOff={animationOff}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SubjectSelector = ({ data, selectedSubject, onSelect, animationOff }) => {
  const [animate, setAnimate] = useState(
    !animationOff && 'animate__fadeInLeft'
  );
  useEffect(() => {
    setTimeout(() => {
      setAnimate('');
    }, 2000);
  }, []);
  return (
    <div>
      {data.map((subjectInfo, index) => (
        <SubjectProgress
          subject={subjectInfo.subject}
          key={subjectInfo.subject}
          value={subjectInfo.completedChallenge}
          total={subjectInfo.totalChallenge}
          className={`has-margin-bottom-4 animate__animated animate__faster ${animate}`}
          style={{ animationDelay: `${index * 100}ms` }}
          selected={selectedSubject === subjectInfo.subject}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

const SubjectProgress = ({
  value,
  total,
  subject,
  onSelect,
  className,
  selected,
  ...props
}) => {
  const subjectProperties = SUBJECT_PROPERTIES.find((x) => x.name === subject);
  const icon = subjectProperties.icon;
  const subjectName = subjectProperties.shortName;

  const isFinish = value === total;
  const text = isFinish ? '✔' : `${value}/${total}`;

  const inactiveStyle = {
    path: {
      stroke: '#9A9A9A',
      strokeWidth: '12px',
      strokeLinecap: 'butt'
    },
    trail: {
      strokeWidth: '12px'
    },
    text: {
      // Text color
      fill: '#9A9A9A',
      fontSize: isFinish ? '40px' : '30px',
      fontWeight: 'bold',
      fontFamily: 'Roboto Condensed'
    }
  };

  const activeStyle = {
    path: {
      stroke: '#5B70F6',
      strokeWidth: '12px',
      strokeLinecap: 'butt'
    },
    trail: {
      strokeWidth: '12px'
    },
    text: {
      // Text color
      fill: '#5B70F6',
      fontSize: isFinish ? '40px' : '30px',
      fontWeight: 'bold',
      fontFamily: 'Roboto Condensed'
    }
  };

  const onSelectSubject = () => {
    onSelect(subject);
  };

  return (
    <div
      {...props}
      tabIndex={0}
      onClick={onSelectSubject}
      onKeyPress={onSelectSubject}
      role="button"
      className={cn(styles.subjectContainer, className, {
        [styles.selected]: selected
      })}
    >
      <i className={cn(styles.icon, icon)}></i>
      <div className={cn(styles.name)}>{subjectName}</div>
      <div className={styles.progressRing}>
        <CircularProgressbar
          value={value / total}
          maxValue={1}
          text={text}
          counterClockwise
          styles={selected ? activeStyle : inactiveStyle}
        ></CircularProgressbar>
      </div>
    </div>
  );
};

const QuestionPackage = ({
  isUnlocked,
  data,
  title,
  onSelect,
  className,
  ...props
}) => {
  const { reward, totalQuestion, id, isCompleted } = data;

  const [lockAnimated, setLockAnimated] = useState('');
  const handleSelectQuestion = () => {
    if (isUnlocked) onSelect(id);
    else {
      setLockAnimated('animate__headShake');
      setTimeout(() => {
        setLockAnimated('');
      }, 500);
    }
  };

  return (
    <div
      {...props}
      className={cn(styles.questionPackContainer, className, {
        [styles.locked]: !isUnlocked
      })}
      onClick={handleSelectQuestion}
      onKeyPress={handleSelectQuestion}
      tabIndex={0}
      role="button"
    >
      <div className={cn(styles.title)} data-tooltip={title}>
        <span>{title}</span>
      </div>
      <div className={cn(styles.packInfo)}>
        <div
          className={cn(styles.quantity)}
          data-tooltip={`Câu hỏi: ${totalQuestion} câu`}
        >
          <i className={cn('icon-question-circle')} />
          <span>{totalQuestion}</span>
        </div>
        <div
          className={cn(styles.coins)}
          data-tooltip={`Thưởng: ${reward} Xcoin`}
        >
          <Coin size="normal" />
          <span className="has-margin-left-2">{reward}</span>
        </div>
      </div>

      {!isUnlocked && (
        <div className={cn(styles.locker)}>
          <i
            className={cn(
              'icon-lock animate__animated animate__fast',
              lockAnimated
            )}
          ></i>
        </div>
      )}
      {isCompleted && <span className={styles.completedPackage}></span>}
    </div>
  );
};

const QuestionLevel = ({
  level,
  data,
  onSelectedQuestionPackage,
  className,
  delayTime,
  animationOff,
  ...props
}) => {
  return (
    <div className={cn(styles.questionLevelContainer, className)} {...props}>
      <div className={cn(styles.levelContainer)}>
        <span>Cấp độ:</span>
        <LevelTag level={level} className="has-margin-left-3" />
      </div>
      <div className="">
        {data.map((item, index) => (
          <QuestionPackage
            key={item.id}
            isUnlocked={item.isUnlocked}
            data={{
              ...item.match,
              reward: item.reward,
              isCompleted: item.isCompleted,
              id: item.id
            }}
            title={item.title}
            onSelect={onSelectedQuestionPackage}
            className={
              !animationOff && 'animate__animated animate__zoomIn animate__fast'
            }
            style={{ animationDelay: `${index * 100 + delayTime}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

// After render each package, decrease completed question by 4 (lenght of that package)
const QuestionLevels = ({ data, onSelectedQuestionPackage, animationOff }) => {
  const filteredData = [
    { id: 'easy', data: data.filter((x) => x.level.name === 'easy') },
    { id: 'medium', data: data.filter((x) => x.level.name === 'medium') },
    { id: 'hard', data: data.filter((x) => x.level.name === 'hard') }
  ];

  return (
    <>
      {filteredData.map((item, index) => (
        <QuestionLevel
          key={item.id}
          level={item.id}
          data={item.data}
          delayTime={index * 400}
          onSelectedQuestionPackage={onSelectedQuestionPackage}
          className="has-margin-bottom-5"
          animationOff={animationOff}
        />
      ))}
    </>
  );
};
