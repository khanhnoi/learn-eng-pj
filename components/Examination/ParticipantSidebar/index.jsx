import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-collapse';
import { CSSTransition } from 'react-transition-group';
import { useTransition, animated } from 'react-spring';
import cn from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import styles from './styles.module.scss';

import firebase from '../../../services/firebase';
import Button from '../../Common/Button';
import Avatar from '../../Common/Avatar';

const Fader = ({ children, fadeIn }) => (
  <CSSTransition in={fadeIn} timeout={200} classNames="animation-node">
    {children}
  </CSSTransition>
);

const ParticipantSidebar = ({ loading, onTimeUp, type, matchInfo }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [participants, setParticipants] = useState([]);

  const [rows, setRows] = useState([]);
  const height = 60;
  const transitions = useTransition(
    rows.map((data, i) => ({ ...data, height, y: i * height })),
    (d) => d.id,
    {
      from: { position: 'absolute', height: height, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height })
    }
  );

  useEffect(() => {
    if (!matchInfo) return;
    if (matchInfo.type !== 'freedom') {
      getCompetitionFirebase(matchInfo.id, matchInfo);
    }
  }, [matchInfo]);

  const onCollapsed = () => {
    setIsRotating(false);
    setTimeout(() => {
      setIsCollapsed(!isCollapsed);
      setIsRotating(true);
    }, 200);
  };

  const getCompetitionFirebase = (id, competition) => {
    const competitionRef = firebase.database().ref(`/${type}s/${id}/p`);
    competitionRef.on(
      'value',
      (snapshot) => {
        try {
          const players = snapshot.val() || {};
          if (competition.participants && players) {
            let newParticipants = competition.participants
              .map((x) => {
                return {
                  displayName: x.displayName,
                  username: x.username,
                  progress: players[x.userId].p || 0,
                  status: players[x.userId].s,
                  id: x.userId,
                  userId: x.userId,
                  avatar: x.avatar
                };
              })
              .filter(
                (x) =>
                  type === 'battle' ||
                  (type === 'competition' &&
                    (x.status === 'started' || x.status === 'completed'))
              );
            newParticipants = _.orderBy(
              newParticipants,
              (x) => x.progress,
              'desc'
            ).slice(0, 5);

            setParticipants(newParticipants);
            setRows(newParticipants);
          }
        } catch (err) {
          console.log(err);
        }
      },
      (error) => console.log(error)
    );
  };

  const getDuration = () => {
    return Math.round(
      moment
        .duration(
          moment(matchInfo?.startTime)
            .add(matchInfo?.durationInSeconds, 'seconds')
            .subtract(moment())
        )
        .asSeconds()
    );
  };

  return (
    <div className={cn(styles.container, 'has-text-centered')}>
      {loading ? (
        <></>
      ) : (
        <>
          <Timer timeInSeconds={getDuration()} onTimeUp={onTimeUp} />
          {participants.length > 0 && (
            <Fader fadeIn={isRotating}>
              <Button
                size="small"
                onClick={onCollapsed}
                className={cn(styles.btnHide)}
                textPrimary
                rightIcon={
                  <img
                    style={isCollapsed ? { transform: 'rotate(180deg)' } : {}}
                    src="/static/img/icons/icon-chevrons-top.svg"
                    alt="icon"
                  />
                }
              >
                {isCollapsed ? 'Hiện' : 'Ẩn'}
              </Button>
            </Fader>
          )}

          <Collapse isOpened={!isCollapsed}>
            <div
              className={styles.avatars}
              style={{
                height: `${
                  height * transitions.length +
                  (transitions.length > 0 ? 20 : 0)
                }px`
              }}
            >
              {transitions.map(
                ({ item, props: { y, ...rest }, key }, index) => (
                  <animated.div
                    className={styles.animatedDiv}
                    key={`avt-sidebar-${key}`}
                    style={{
                      zIndex: participants.length - index,
                      transform: y.interpolate(
                        (y) => `translate3d(0,${y}px,0)`
                      ),
                      ...rest
                    }}
                  >
                    <Avatar
                      className="is-inline-block has-margin-bottom-3 has-margin-top-3"
                      displayName={item.displayName}
                      size="normal"
                      url={item.avatar}
                      badge={index + 1}
                      isBadgeInverted={index === 0}
                    ></Avatar>
                  </animated.div>
                )
              )}
            </div>
          </Collapse>
        </>
      )}
    </div>
  );
};

const Timer = ({ timeInSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(timeInSeconds);

  const onFinished = () => {
    onTimeUp && onTimeUp();
  };

  useEffect(() => {
    setSeconds(timeInSeconds);
    const interval = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds > 0) {
          if (seconds === 5) {
            setTimeout(() => {
              onFinished();
            }, 1000);
          }
          return seconds - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInSeconds]);

  const twoDigits = (number) => {
    if (number < 0) return '00';
    if (number < 10) return '0' + number;
    return number;
  };
  const getCountDownTime = (time) => {
    const minute = Math.floor(time / 60) || 0;
    const second = time % 60 || 0;
    return `${twoDigits(minute)} : ${twoDigits(second)}`;
  };

  return (
    <div className={cn(styles.itemContainer, styles.timer)}>
      <i className="icon-timer"></i>
      <p>{getCountDownTime(seconds)}</p>
    </div>
  );
};

export default ParticipantSidebar;
