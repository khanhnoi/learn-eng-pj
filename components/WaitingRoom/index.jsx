import React, { useState } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import Spinner from '../Common/Spinner';
import RoomInfo from './RoomInfo';
import ChatBox from './ChatBox';
import WaitingPlayers from './WaitingPlayers';
import { useEffect } from 'react';

/**
 * @param {string} title string (Wating room title)
 * @param {object} data object { creatorId: } can be a competition, battle
 * @param {object} roomInfoData object { creatorId: } can be a competition, battle
 * @param {object} user object - current user
 * @param {array} messages - array
 * @param {array} readyUsers - array
 * @param {boolean} loading - boolean
 * @param {boolean} isChatDisabled - boolean
 * @param {function} onStart - function
 * @param {function} onQuit - function
 * @param {function} postMessage - function
 */
export const WaitingRoom = ({
  title,
  loading,
  messages,
  postMessage,
  readyUsers,
  user,
  data,
  roomInfoData,
  isChatDisabled,
  onStart,
  onQuit,
  starting,
  isBattle,
  animationOff
}) => {
  const [leftAnimate, setLeftAnimate] = useState(
    !animationOff && 'animate__backInLeft'
  );
  const [rightAnimate, setRightAnimate] = useState(
    !animationOff && 'animate__backInRight'
  );

  useEffect(() => {
    if (starting && !animationOff) {
      setLeftAnimate('animate__backOutLeft');
      setRightAnimate('animate__backOutRight');
    }
  }, [starting]);

  return (
    <>
      <Spinner enable={loading}></Spinner>
      <div className={cn('columns has-margin-y-0', styles.container)}>
        <div
          className={cn(
            styles.leftCol,
            `column is-2 col-sidebar-left animate__animated ${leftAnimate}`
          )}
        >
          <div className={cn()}>
            <RoomInfo data={roomInfoData} isBattle={isBattle}></RoomInfo>
          </div>
        </div>

        <div className="column is-7 is-offset-2">
          <WaitingPlayers
            participants={readyUsers}
            onStart={onStart}
            onQuit={onQuit}
            data={data}
            title={title}
            isBattle={isBattle}
            animationOff={animationOff}
          ></WaitingPlayers>
        </div>
        <div
          className={cn(
            `column is-3 col-sidebar-right animate__animated ${rightAnimate}`
          )}
        >
          <div className={cn(styles.rightCol)}>
            <ChatBox
              data={messages}
              onSend={postMessage}
              myId={user.id}
              disabled={isChatDisabled}
              animationOff={animationOff}
            />
          </div>
        </div>
      </div>
    </>
  );
};
