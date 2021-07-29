import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import moment from 'moment';

import Layout from '../../components/Layout';
import firebase from '../../services/firebase';
import { WaitingRoom } from '../../components/WaitingRoom';
import { User } from '../../hooks/useUser';
import { getBattle, startBattleParticipant } from '../../services/battle';
import { handleError } from '../../utils';
import { withAuthenticatedUser } from '../../services/auth';
import Spinner from '../../components/Common/Spinner';
import { toast } from 'react-toastify';
import withQuestionAgent from '../../components/HOCComponent/WithQuestionAgent';
import ErrorDashboard from '../../components/ErrorDashboard';
import PromptRouteChange from '../../components/Common/PromptRouteChange';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [battle, setBattle] = useState({});
    const [participants, setParticipants] = useState([]);
    const [messages, setMessages] = useState([]);
    const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);
    const [allowRoute, setAllowRoute] = useState(true);

    const getRoomInfoData = () => {
      return {
        ...battle,
        time: battle.startTime,
        level: battle.level && battle.level.name,
        fbShareUrl: getShareUrl(),
        fbShareQuote: getShareQuote()
      };
    };
    const [isQuit, setIsQuit] = useState(false);
    const onQuit = async () => {
      setAllowRoute(true);
      setIsQuit(true);
    };

    useEffect(() => {
      if (isQuit) {
        setParticipantStatus(battle, 'declined');
        Router.replace('/battle');
      }
    }, [isQuit]);

    const setParticipantStatus = (battle, status) => {
      firebase
        .database()
        .ref(`battles/${battle.id}/p/${user.id}/s`)
        .set(status);
    };

    const participantsRef = useRef();
    participantsRef.current = participants;

    const getReadyUsers = () => {
      return participants.filter((x) => x.status === 'accepted');
    };

    const subscribeMessages = (battle) => {
      try {
        const messageRef = firebase
          .database()
          .ref(`messages/battles/${battle.id}`);
        messageRef.on('value', (snapshot) => {
          const messagesVal = snapshot.val() || {};
          const messages = Object.keys(messagesVal).map((x) => {
            const userInfo = participantsRef.current?.find(
              (p) => p.userId === messagesVal[x].u
            );
            const avatar = userInfo && userInfo.avatar;
            const displayName = userInfo && userInfo.displayName;
            return {
              id: x,
              content: messagesVal[x].c,
              userId: messagesVal[x].u,
              avatar: avatar,
              displayName: displayName
            };
          });
          setMessages(messages);
        });
      } catch (error) {
        console.error(error);
      }
    };

    const postMessage = (content) => {
      try {
        const messageRef = firebase
          .database()
          .ref(`messages/battles/${battle.id}`);
        messageRef.push().set({
          u: user.id,
          c: content
        });
      } catch (error) {
        console.error(error);
      }
    };

    const [show404, setShow404] = useState(false);
    const onGetBattle = async (battleId) => {
      try {
        setLoading(true);
        const res = await getBattle(battleId);
        const battle = res.data;

        if (battle.status !== 'available') {
          setShow404(true);
          return;
        }

        // checking room available to hide content if room not available
        setCheckingRoomAvailable(false);
        setBattle(battle);
        // allow route false means stop allow navigating anywhere
        setAllowRoute(false);
      } catch (error) {
        handleLocalError(error);
      } finally {
        setLoading(false);
      }
    };

    const handleLocalError = (error) => {
      if (error?.response?.data?.code === 'E__NOT_FOUND_ERROR') {
        setShow404(true);
      } else {
        handleError(error);
        Router.replace('/battle');
      }
    };

    useEffect(() => {
      if (battle.id) {
        setParticipantFirebase(battle);
        getBattleParticipantsFirebase(battle);
        subscribeBattleStatusChanged(battle);
        subscribeMessages(battle);
      }
    }, [battle.id]);

    const setParticipantFirebase = (battle) => {
      firebase.database().ref(`battles/${battle.id}/p/${user.id}`).set({
        s: 'accepted',
        a: user.avatar,
        dn: user.displayName,
        us: user.username,
        t: moment().toISOString()
      });
    };

    const getBattleParticipantsFirebase = (battle) => {
      const battleRef = firebase.database().ref(`battles/${battle.id}/p`);
      battleRef.on(
        'value',
        async (snapshot) => {
          try {
            const participantsNode = snapshot.val() || {};
            const readyUsers = Object.keys(participantsNode).map((key) => {
              const x = participantsNode[key];
              return {
                displayName: x.dn,
                username: x.us,
                status: x.s,
                id: parseInt(key),
                userId: parseInt(key),
                avatar: x.a
              };
            });
            setParticipants(_.orderBy(readyUsers, (x) => x.t, 'desc'));
          } catch (err) {
            console.log(err);
          }
        },
        (error) => console.log(error)
      );
    };

    const subscribeBattleStatusChanged = (battle) => {
      const competitionRef = firebase.database().ref(`battles/${battle.id}/md`);
      competitionRef.on(
        'value',
        (snapshot) => {
          try {
            const md = snapshot.val() || {};
            if (md.s === 'started') {
              onBattleStarted();
            }
          } catch (err) {
            console.log(err);
          }
        },
        (error) => console.log(error)
      );
    };

    const onBattleStarted = async () => {
      setAllowRoute(true);
      await onStartBattleParticipant();
    };

    const onNavigateToBattle = () => {
      const { id } = router.query;
      Router.replace(`/battle/${id}`);
    };

    const onStartBattleParticipant = async () => {
      try {
        setLoading(true);
        await startBattleParticipant(battle.id);
        onNavigateToBattle();
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    const getChatDisable = () => {
      return battle.status === 'started' || !user.id;
    };

    const getTitle = () => battle.title;

    const getShareUrl = () => {
      return `${process.env.WEB_URL}/battle-invitation/${router.query.id}`;
    };

    const getShareQuote = () => {
      return `${user.displayName} đang đợi bạn tại phòng chờ, tham gia trận đấu cùng cậu ấy và mang về những phần thưởng hấp dẫn nào ^^`;
    };

    const { user } = User.useContainer();
    useEffect(() => {
      if (user.id && checkingRoomAvailable) {
        onGetBattle(router.query.id);
      }
    }, [user.id]);

    if (show404) return <ErrorDashboard />;

    if (checkingRoomAvailable) return <Spinner showLogo enable />;

    return (
      <Layout isOrange animationOff={animationOff}>
        <PromptRouteChange
          message="Bạn có chắc chắn muốn rời khỏi phòng chờ không?"
          allowRoute={allowRoute}
        />
        <WaitingRoom
          postMessage={postMessage}
          animationOff={animationOff}
          onQuit={onQuit}
          messages={messages}
          loading={loading}
          readyUsers={getReadyUsers()}
          user={user}
          data={battle}
          roomInfoData={getRoomInfoData()}
          isChatDisabled={getChatDisable()}
          title={getTitle()}
          isBattle
        />
      </Layout>
    );
  })
);
