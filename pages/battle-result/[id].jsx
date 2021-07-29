import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import {
  BattleRank,
  BattleResult,
  BattleInfo
} from '../../components/BattleResult';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import { getBattleParticipant, getBattle } from '../../services/battle';
import Layout from '../../components/Layout';
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
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const [battleInfo, setBattleInfo] = useState({});
    const [checkingRoomAvailable, setCheckingRoomAvailable] = useState(true);

    const onGetBattleParticipant = async () => {
      try {
        setLoading(true);
        const { id } = router.query;
        const participants = (await getBattleParticipant(id)).data;

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

        const battleInfo = (await getBattle(id)).data;

        if (battleInfo?.status !== 'completed') {
          setShow404(true);
          return;
        }

        setBattleInfo({
          ...battleInfo,
          participants: users
        });

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
        Router.replace('/battle');
      }
    };

    const onGoToBattleReview = () => {
      const { id } = router.query;
      Router.replace(`/battle-review/${id}`);
    };

    useEffect(() => {
      if (user.id) onGetBattleParticipant();
    }, [user.id]);

    useEffect(() => {
      const firstNotification = notifications[0];
      if (!firstNotification) return;
      if (firstNotification.action?.type === 'navigate') {
        const route = firstNotification.action?.value?.split('/');
        if (route[0]?.includes('battle') && route[1] === '' + router.query.id) {
          markNotificationAsRead(user.id, firstNotification.id);
        }
      }
    }, [notifications]);

    if (show404) return <ErrorDashboard />;

    if (checkingRoomAvailable) return <Spinner showLogo enable />;

    return (
      <Layout isOrange isWide animationOff={animationOff}>
        <div className="columns has-margin-y-0 is-variable is-8-desktop">
          <div className="column is-3 left-sidebar-layout">
            <BattleInfo data={battleInfo} isLoading={isLoading} />
          </div>
          <div className="column is-6">
            <BattleResult
              isLoading={isLoading}
              animationOff={animationOff}
              onGoToReview={onGoToBattleReview}
              users={users}
              user={user}
            ></BattleResult>
          </div>
          <div className="column is-3 has-padding-x-0 right-sidebar-layout">
            <BattleRank
              isLoading={isLoading}
              animationOff={animationOff}
              users={users?.filter((x, index) => index < 5)}
              user={user}
            ></BattleRank>
          </div>
        </div>
      </Layout>
    );
  })
);
