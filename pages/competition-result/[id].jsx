import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/Layout';

import {
  CompetitionRank,
  CompetitionResult as CompetitionResultComponent,
  CompetitionInfo
} from '../../components/CompetitionResult';
import {
  getCompetitionParticipant,
  getCompetition
} from '../../services/competition';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import { withAuthenticatedUser } from '../../services/auth';
import { Notification } from '../../hooks/useNotification';
import Spinner from '../../components/Common/Spinner';
import withQuestionAgent from '../../components/HOCComponent/WithQuestionAgent';
import ErrorDashboard from '../../components/ErrorDashboard';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    const { user } = User.useContainer();
    const {
      notifications,
      markNotificationAsRead
    } = Notification.useContainer();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);
    const [competitonInfo, setCompetitionInfo] = useState({});

    const onGetCompetitionParticipant = async () => {
      try {
        setLoading(true);
        const { id } = router.query;
        const participants = (await getCompetitionParticipant(id)).data;

        const users = _.orderBy(
          participants
            .filter((x) => x.status === 'completed')
            .map((x) => ({
              ...x,
              id: x.participantId,
              userId: x.userId,
              order: x.order,
              displayName: x.displayName,
              record: `Đúng ${x.score}/${x.totalQuestion}`,
              coin: x.coin
            })),
          (x) => x.order
        );
        const myResult = users.find((x) => x.userId === user.id);

        if (!myResult) {
          setShow404(true);
          return;
        }

        const competitonInfo = (await getCompetition(id)).data;

        if (competitonInfo?.status !== 'completed') {
          setShow404(true);
          return;
        }

        const formattedCompetitionInfo = {
          ...competitonInfo,
          participants: users
        };

        setCompetitionInfo(formattedCompetitionInfo);
        setUsers(users);
        setCheckingRoomAvailable(false);
      } catch (error) {
        handleLocalError(error);
      } finally {
        setLoading(false);
      }
    };

    const [show404, setShow404] = useState(false);
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
        Router.replace('/competition');
      }
    };

    const onGoToCompetitionReview = () => {
      const { id } = router.query;
      Router.replace(`/competition-review/${id}`);
    };

    useEffect(() => {
      if (user.id) {
        onGetCompetitionParticipant();
      }
    }, [user.id]);

    // mark notification of this competition as read
    useEffect(() => {
      const firstNotification = notifications[0];
      if (!firstNotification) return;
      if (firstNotification.action?.type === 'navigate') {
        const route = firstNotification.action?.value?.split('/');
        if (
          route[0]?.includes('competition') &&
          route[1] === '' + router.query.id
        ) {
          markNotificationAsRead(user.id, firstNotification.id);
        }
      }
    }, [notifications]);

    if (show404) return <ErrorDashboard />;

    if (checkingRoomAvailable) return <Spinner showLogo enable />;

    return (
      <Layout isWide animationOff={animationOff}>
        <Spinner enable={isLoading} />
        <div className="columns has-margin-y-0 is-variable is-8-desktop">
          <div className="column is-3 left-sidebar-layout">
            <CompetitionInfo data={competitonInfo} isLoading={isLoading} />
          </div>
          <div className="column is-6">
            <CompetitionResultComponent
              isLoading={isLoading}
              animationOff={animationOff}
              onGoToReview={onGoToCompetitionReview}
              users={users}
              user={user}
            ></CompetitionResultComponent>
          </div>
          <div className={'column is-3 has-padding-x-0 right-sidebar-layout'}>
            <CompetitionRank
              isLoading={isLoading}
              animationOff={animationOff}
              users={users}
              user={user}
            ></CompetitionRank>
          </div>
        </div>
      </Layout>
    );
  })
);
