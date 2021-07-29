import React, { useState, useEffect } from 'react';
import ExaminationReview from '../../components/ExaminationReview';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import withQuestionAgent from '../../components/HOCComponent/WithQuestionAgent';
import ErrorDashboard from '../../components/ErrorDashboard';
import Spinner from '../../components/Common/Spinner';
import _ from 'lodash';
import { User } from '../../hooks/useUser';
import { getMyChallenges, getChallengeResult } from '../../services/challenge';
import { withAuthenticatedUser } from '../../services/auth';
import { handleError } from '../../utils';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    const onExit = async () => {
      Router.replace('/challenge');
    };

    const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);
    const [show404, setShow404] = useState(false);
    const onCheckingChallengeAvailable = async (id, participantId) => {
      try {
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

        if (!currentChallenge?.isCompleted) {
          setShow404(true);
          return;
        }
        const params = { fromNo: 1, toNo: 1, participantId };

        const matchInfo = (await getChallengeResult(id, params)).data;

        if (_.isEmpty(matchInfo) || _.isEmpty(matchInfo?.challenge)) {
          setShow404(true);
          return;
        }

        setCheckingRoomAvailable(false);
      } catch (error) {
        handleLocalError(error);
      } finally {
      }
    };

    const toString = (value) => value + '';

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
      const { id, participantId } = router.query;
      if (user.id && checkingRoomAvailable)
        onCheckingChallengeAvailable(id, participantId);
    }, [user.id]);

    if (show404) return <ErrorDashboard />;
    if (checkingRoomAvailable) return <Spinner showLogo enable />;

    return (
      <Layout isWide={true} animationOff={animationOff}>
        <ExaminationReview
          type="challenge"
          onExit={onExit}
          animationOff={animationOff}
        />
      </Layout>
    );
  })
);
