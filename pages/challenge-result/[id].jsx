import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import { withAuthenticatedUser } from '../../services/auth';
import { getChallengeResult, getMyChallenges } from '../../services/challenge';
import { ChallengeResult } from '../../components/ChallengeResult';
import { DEFAULT_LEVELS_CONFIG } from '../../constants';
import withQuestionAgent from '../../components/HOCComponent/WithQuestionAgent';
import ErrorDashboard from '../../components/ErrorDashboard';
import Spinner from '../../components/Common/Spinner';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    const { user } = User.useContainer();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [challengeInfo, setChallengeInfo] = useState({});
    const [finishAllChallenges, setFinishAllChallenges] = useState(false);
    const router = useRouter();

    const [show404, setShow404] = useState(false);
    const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);

    const handleGetChallengeResult = async () => {
      try {
        setLoading(true);
        const { id, participantId } = router.query;
        const params = { fromNo: 1, toNo: 5, participantId };
        const res = (await getChallengeResult(id, params)).data;

        if (_.isEmpty(res) || _.isEmpty(res?.challenge)) {
          setShow404(true);
          return;
        }

        const percentToComplete = res?.challenge?.percentToComplete;
        const level = DEFAULT_LEVELS_CONFIG.find(
          (item) => item.id === res?.challenge?.levelId
        )?.name;
        const users = _.orderBy(
          res?.participants?.map((x) => ({
            ...x,
            id: x.participantId,
            userId: x.userId,
            order: x.order,
            displayName: x.displayName,
            coin: res?.challenge?.reward,
            title: res?.challenge?.title,
            isPassed: (x.score * 100) / x.total >= percentToComplete,
            totalQuestion: x.total,
            level: level
          })),
          (x) => x.order
        );
        setUsers(users);
        setChallengeInfo(res?.challenge);
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
        code === 'E__INVALID_PARAMETER' ||
        code === 'E__FORBIDDEN_ERROR'
      ) {
        setShow404(true);
      } else {
        handleError(error);
        Router.replace('/challenge');
      }
    };

    const onGoToChallengeReview = () => {
      const { id, participantId } = router.query;
      Router.replace(`/challenge-review/${id}?participantId=${participantId}`);
    };

    const handleGoNextChallenge = async () => {
      try {
        const res = await getMyChallenges({
          levelId: [1, 2, 3],
          subjectId: challengeInfo?.subjectId,
          gradeId: challengeInfo?.gradeId
        });

        const listChallenges = res.data;

        const sortedChallenges = listChallenges.sort(
          (a, b) => a?.unlockAtMaturity - b?.unlockAtMaturity
        );
        const currentIndex = sortedChallenges.findIndex(
          (x) => x.id === challengeInfo.id
        );
        if (currentIndex + 1 < sortedChallenges.length) {
          const nextMatchId = sortedChallenges[currentIndex + 1].id;
          Router.push(`/challenge/${nextMatchId}`);
        } else {
          setFinishAllChallenges(true);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      handleGetChallengeResult();
    }, []);

    if (show404) return <ErrorDashboard />;
    if (checkingRoomAvailable) return <Spinner showLogo enable />;

    return (
      <Layout animationOff={animationOff}>
        <div className="columns has-margin-y-0">
          <div className="column is-12">
            <ChallengeResult
              isLoading={isLoading}
              animationOff={animationOff}
              onGoToReview={onGoToChallengeReview}
              users={users}
              user={user}
              challengeId={router.query.id}
              onGoToNextChallenge={handleGoNextChallenge}
              finishAllChallenges={finishAllChallenges}
            ></ChallengeResult>
          </div>
        </div>
      </Layout>
    );
  })
);
