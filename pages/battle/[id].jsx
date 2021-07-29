import React, { useState, useEffect } from 'react';
import Examination from '../../components/Examination';
import ParticipantSidebar from '../../components/Examination/ParticipantSidebar';
import Router, { useRouter } from 'next/router';
import { handleError } from '../../utils';
import {
  submitBattle,
  getBattle,
  getBattleParticipant
} from '../../services/battle';
import firebase from '../../services/firebase';
import Layout from '../../components/Layout';
import { withAuthenticatedUser } from '../../services/auth';
import { User } from '../../hooks/useUser';
import Spinner from '../../components/Common/Spinner';
import ErrorDashboard from '../../components/ErrorDashboard';

export default withAuthenticatedUser(({ animationOff }) => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);
  const [show404, setShow404] = useState(false);

  let competitionRef = null;
  const onTimeUp = () => {
    competitionRef && competitionRef();
  };

  const onGoBack = () => {
    Router.replace('/battle');
  };

  const onNavigateToResult = (id) => {
    Router.replace(`/battle-result/${id}`);
  };
  const onSubmitQuizzes = async (id, participantId, body, hasGoBack) => {
    try {
      setSubmitting(true);
      await submitBattle(id, body);
      if (hasGoBack) {
        onGoBack();
      } else {
        onNavigateToResult(id);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateProgress = (id, userId, progress) => {
    try {
      const participantRef = firebase
        .database()
        .ref(`/battles/${id}/p/${userId}`);
      participantRef.update({ p: progress });
    } catch (error) {
      console.log(error);
    }
  };

  const [matchInfo, setMatchInfo] = useState();
  const onGetBattle = async (id) => {
    try {
      setLoading(true);
      const participants = (await getBattleParticipant(id)).data;
      const myParticipant = participants.find((x) => x.userId === user.id);

      if (!myParticipant || myParticipant?.status !== 'started') {
        setShow404(true);
        return;
      }

      const match = (await getBattle(id)).data;
      match.startTime = myParticipant.startTime;
      match.participants = participants;

      setMatchInfo(match);
      setCheckingRoomAvailable(false);
    } catch (error) {
      handleLocalError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocalError = (error) => {
    const code = error?.response?.data?.code;
    if (code === 'E__NOT_FOUND_ERROR' || code === 'E__INVALID_PARAMETER') {
      setShow404(true);
    } else {
      handleError(error);
    }
  };

  const { user } = User.useContainer();
  const router = useRouter();
  useEffect(() => {
    if (user.id && checkingRoomAvailable) onGetBattle(router.query.id);
  }, [user.id]);

  if (show404) return <ErrorDashboard />;
  if (checkingRoomAvailable) return <Spinner showLogo enable />;

  return (
    <Layout
      isOrange
      isWide={true}
      leftSidebar={
        <ParticipantSidebar
          type="battle"
          onTimeUp={onTimeUp}
          matchInfo={matchInfo}
          loading={loading}
        />
      }
      animationOff={animationOff}
    >
      <Examination
        type="battle"
        animationOff={animationOff}
        setLoading={setLoading}
        loading={loading || submitting}
        updateProgress={updateProgress}
        onSubmitQuizzes={onSubmitQuizzes}
        forwardRef={(e) => (competitionRef = e)}
        // participants={participants}
        matchInfo={matchInfo}
      />
    </Layout>
  );
});
