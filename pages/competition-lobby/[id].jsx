import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import firebase from '../../services/firebase';
import PromptRouteChange from '../../components/Common/PromptRouteChange';
import { WaitingRoom } from '../../components/WaitingRoom';
import { User } from '../../hooks/useUser';
import {
  getCompetition,
  startCompetitionParticipant,
  getCompetitionParticipant,
  startCompetition,
  acceptCompetitionParticipant,
  getCompetitionFromPublic
} from '../../services/competition';
import { handleError } from '../../utils';
import { SUBJECTS } from '../../constants';
import { toast } from 'react-toastify';
import { withAuthenticatedUser } from '../../services/auth';
import Spinner from '../../components/Common/Spinner';
import withQuestionAgent from '../../components/HOCComponent/WithQuestionAgent';
import ErrorDashboard from '../../components/ErrorDashboard';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    const router = useRouter();
    const competitionInfoRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [competition, setCompetition] = useState({});
    const [participant, setParticipant] = useState({});
    const [readyUsers, setReadyUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);

    const getRoomInfoData = () => {
      return {
        ...competition,
        grade: competition.grade && competition.grade.name,
        level: competition.level && competition.level.name,
        subject: competition.subject && competition.subject.name,
        token: competition.publicKey,
        fbShareUrl: getShareUrl(),
        fbShareQuote: getShareQuote()
      };
    };

    const [allowRoute, setAllowRoute] = useState(true);
    const [isQuit, setIsQuit] = useState(false);
    const onQuit = async () => {
      setAllowRoute(true);
      setIsQuit(true);
    };

    useEffect(() => {
      if (isQuit) {
        firebase
          .database()
          .ref(`competitions/${competition.id}/p/${user.id}/s`)
          .set('pending');

        Router.replace('/competition');
      }
    }, [isQuit]);

    const subscribeMessages = (competition) => {
      try {
        const messageRef = firebase
          .database()
          .ref(`messages/competitions/${competition.id}`);
        messageRef.on('value', (snapshot) => {
          const messagesVal = snapshot.val() || {};
          const messages = Object.keys(messagesVal).map((x) => {
            const userInfo = competitionInfoRef.current?.participants?.find(
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
          .ref(`messages/competitions/${competition.id}`);
        messageRef.push().set({
          u: user.id,
          c: content
        });
      } catch (error) {
        console.error(error);
      }
    };

    const [show404, setShow404] = useState(false);
    const onGetCompetition = async (competitionId) => {
      try {
        setLoading(true);
        let res = null;
        const { token } = router.query;
        if (token) {
          res = await getCompetitionFromPublic({ publicKey: token });
        } else {
          res = await getCompetition(competitionId);
        }
        const competition = res.data;

        if (competition.status !== 'created') {
          setShow404(true);
          return;
        }

        const userCoin = user.totalCoin;
        if (userCoin < competition.bet) {
          Router.replace('/competition');
          toast.error('Bạn không đủ Xcoin để tham gia trận đấu này.');
          return;
        }

        const participants = (await getCompetitionParticipant(competitionId))
          .data;

        competition.participants = participants;
        const participant = participants.find((x) => x.userId === user.id);
        setParticipant(participant);
        setCompetition(competition);
        competitionInfoRef.current = competition;
        subscribeMessages(competition);
        setAllowRoute(false);
        setCheckingRoomAvailable(false);
      } catch (error) {
        handleLocalError(error);
      } finally {
        setLoading(false);
      }
    };

    const handleLocalError = (error) => {
      const code = error?.response?.data?.code;
      if (
        code === 'E__NOT_FOUND_ERROR' ||
        code === 'E__FORBIDDEN_ERROR' ||
        code === 'E__INVALID_PARAMETER'
      ) {
        setShow404(true);
      } else {
        handleError(error);
        Router.replace('/competition');
      }
    };

    useEffect(() => {
      if (competition.id) {
        getCompetitionFirebase(competition);
        subscribeCompetitionStatusChanged(competition);
        subscribeCompetitionParticipantStatusChanged(competition);
      }
    }, [competition.id]);

    const getCompetitionFirebase = (competition) => {
      const competitionRef = firebase
        .database()
        .ref(`competitions/${competition.id}/p`);
      competitionRef.on(
        'value',
        async (snapshot) => {
          try {
            const competitionNode = snapshot.val();
            const players = competitionNode;
            const res = await getCompetition(router.query.id);
            const competition = res.data;
            setCompetition(competition);
            competitionInfoRef.current = competition;
            if (competition.participants) {
              const readyUsers = _.orderBy(
                competition.participants
                  .map((x) => {
                    return {
                      displayName: x.displayName,
                      username: x.username,
                      progress: players[x.userId] && players[x.userId].p,
                      status: players[x.userId] && players[x.userId].s,
                      id: x.userId,
                      userId: x.userId,
                      avatar: x.avatar
                    };
                  })
                  .filter(
                    (u) => u.status === 'accepted' || u.status === 'pending'
                  ),
                (x) => x.status
              );
              setReadyUsers(_.uniqBy(readyUsers, 'userId'));
            }
          } catch (err) {
            console.log(err);
          }
        },
        (error) => console.log(error)
      );
    };

    const subscribeCompetitionStatusChanged = (competition) => {
      const competitionRef = firebase
        .database()
        .ref(`competitions/${competition.id}/md`);
      competitionRef.on(
        'value',
        (snapshot) => {
          try {
            const md = snapshot.val();
            if (md.s === 'started') {
              onCompetitionStarted();
            }
          } catch (err) {
            console.log(err);
          }
        },
        (error) => console.log(error)
      );
    };

    const subscribeCompetitionParticipantStatusChanged = (competition) => {
      const competitionRef = firebase
        .database()
        .ref(`competitions/${competition.id}/p/${user.id}/s`);
      competitionRef.on(
        'value',
        (snapshot) => {
          try {
            const status = snapshot.val();
            if (status === 'started') {
              onNavigateToCompetition();
            }
          } catch (err) {
            console.log(err);
          }
        },
        (error) => console.log(error)
      );
    };

    const onCompetitionStarted = async () => {
      await onStartCompetitionParticipant();
    };

    const [starting, setStarting] = useState(false);
    const onNavigateToCompetition = () => {
      setAllowRoute(true);
      setStarting(true);
    };

    // Call when start competition
    useEffect(() => {
      if (starting) {
        const { id } = router.query;
        Router.replace(`/competition/${id}`);
      }
    }, [starting]);

    const onStartCompetition = async () => {
      try {
        setLoading(true);
        await startCompetition(competition.id);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    const onStartCompetitionParticipant = async () => {
      try {
        setLoading(true);
        await startCompetitionParticipant(
          competition.id,
          participant.participantId
        );
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    const getChatDisable = () => {
      return !(
        participant.status === 'accepted' || participant.status === 'started'
      );
    };

    const getTitle = () =>
      `Phòng chờ môn ${
        SUBJECTS.SHORT[competition.subject && competition.subject.name]
      } ${competition.grade && competition.grade.name}        `;

    const handleJoinCompetitionAgain = async (competitionId, userId) => {
      // Incase user didn't accept but enter link, try call accept invitation again
      acceptCompetitionParticipant(competitionId, participant.participantId);

      firebase
        .database()
        .ref(`competitions/${competitionId}/p/${userId}/s`)
        .set('accepted');
    };

    // Call when component mounted
    const { user } = User.useContainer();
    useEffect(() => {
      if (user.id && checkingRoomAvailable) {
        onGetCompetition(router.query.id);
      }
    }, [user.id]);

    // Check if ready users change or creator left
    useEffect(() => {
      if (isQuit) return;
      const { creatorId } = competition;
      readyUsers.map((readyUser) => {
        if (readyUser.id === creatorId && readyUser.status === 'pending') {
          setIsCreatorQuit(true);
        }
        if (readyUser.id === user.id && readyUser.status === 'pending') {
          handleJoinCompetitionAgain(competition.id, user.id);
        }
        return readyUser;
      });
    }, [readyUsers, competition]);

    const getShareUrl = () => {
      return `${process.env.WEB_URL}/competition-invitation/${router.query.id}?token=${competition.publicKey}`;
    };

    const getShareQuote = () => {
      return `${user.displayName} đang đợi bạn tại phòng chờ, tham gia trận đấu cùng cậu ấy và mang về những phần thưởng hấp dẫn nào ^^`;
    };

    const [isCreatorQuit, setIsCreatorQuit] = useState(false);
    useEffect(() => {
      if (isCreatorQuit) {
        onQuit();
        toast.error('Chủ phòng đã rời khỏi phòng đấu.');
      }
    }, [isCreatorQuit]);

    if (show404) return <ErrorDashboard />;

    if (checkingRoomAvailable) return <Spinner showLogo enable />;

    return (
      <Layout animationOff={animationOff}>
        <PromptRouteChange
          message="Bạn có chắc chắn muốn rời khỏi phòng chờ không?"
          allowRoute={allowRoute}
        />
        <WaitingRoom
          animationOff={animationOff}
          postMessage={postMessage}
          onQuit={onQuit}
          messages={messages}
          loading={loading}
          readyUsers={readyUsers}
          onStart={onStartCompetition}
          user={user}
          data={competition}
          roomInfoData={getRoomInfoData()}
          title={getTitle()}
          starting={starting}
        />
      </Layout>
    );
  })
);
