import React, { useState, useEffect } from 'react';
import Examination from '../../components/Examination';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ErrorDashboard from '../../components/ErrorDashboard';
import Spinner from '../../components/Common/Spinner';
import _ from 'lodash';
import { User } from '../../hooks/useUser';
import { withAuthenticatedUser } from '../../services/auth';
import { handleError } from '../../utils';
import {
  getMyChallenges,
  submitChallenge,
  startChallengeParticipant
} from '../../services/challenge';

export default withAuthenticatedUser(({ animationOff }) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);
  const [show404, setShow404] = useState(false);

  const onGoBack = () => {
    Router.replace('/challenge');
  };

  const onNavigateToResult = (id, participantId) => {
    Router.replace(`/challenge-result/${id}?participantId=${participantId}`);
  };

  const onSubmitQuizzes = async (id, participantId, body, hasGoBack) => {
    try {
      setSubmitting(true);

      await submitChallenge(id, body);
      if (hasGoBack) {
        onGoBack();
      } else {
        onNavigateToResult(id, participantId);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateProgress = () => {
    // Don't update progress in challenge
  };

  const toString = (value) => value + '';

  const [matchInfo, setMatchInfo] = useState();
  const onStartChallenge = async (id) => {
    try {
      setLoading(true);

      const requests = [...Array(6).keys()].map((x) =>
        getMyChallenges({
          levelId: [1, 2, 3],
          subjectId: x + 1,
          gradeId: user?.grade?.id
        })
      );

      const challengesArray = await Promise.all(requests);

      const myChallenges = _.flatten(challengesArray.map((x) => x.data));

      const currentChallenge = myChallenges.find(
        (x) => toString(x.id) === toString(id)
      );

      if (!currentChallenge?.isUnlocked) {
        setShow404(true);
        return;
      }

      const challengeInfo = (await startChallengeParticipant(id)).data;

      const participants = [];
      participants.push(challengeInfo);
      const match = {
        id,
        participants,
        totalQuestions: challengeInfo.totalQuestion
      };

      setMatchInfo(match);
      setCheckingRoomAvailable(false);
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
    }
  };

  const { user } = User.useContainer();
  const router = useRouter();
  useEffect(() => {
    if (user.id && checkingRoomAvailable) onStartChallenge(router.query.id);
  }, [user.id]);

  if (show404) return <ErrorDashboard />;
  if (checkingRoomAvailable) return <Spinner showLogo enable />;

  return (
    <Layout isWide={true} leftSidebar={<></>} animationOff={animationOff}>
      <Examination
        type="challenge"
        animationOff={animationOff}
        setLoading={setLoading}
        loading={loading || submitting}
        updateProgress={updateProgress}
        onSubmitQuizzes={onSubmitQuizzes}
        matchInfo={matchInfo}
      />
    </Layout>
  );
});
