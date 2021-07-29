import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Layout from '../components/Layout';
import BattleDashboard from '../components/BattleDashboard';
import { withAuthenticatedUser } from '../services/auth';
import { handleError } from '../utils';
import { getMyBattles } from '../services/battle';
import { User } from '../hooks/useUser';
import withOnBoarding from '../components/HOCComponent/WithOnBoarding';
import withToast from '../components/HOCComponent/WithToast';
import withNotificationModal from '../components/HOCComponent/WithNotificationModal';
import { DEFAULT_GRADE } from '../constants';
import withQuestionAgent from '../components/HOCComponent/WithQuestionAgent';

const BattlePage = ({ animationOff }) => {
  const { user } = User.useContainer();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userGradeId, setUserGradeId] = useState();

  const getBattles = async (gradeId) => {
    setLoading(true);
    try {
      const res = await getMyBattles({ gradeId });
      setData(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userGradeId) getBattles(userGradeId);
  }, [userGradeId]);

  useEffect(() => {
    const gradeId = user?.grade?.name ?? DEFAULT_GRADE;
    setUserGradeId(gradeId);
  }, [user]);

  const handleUpdateGrade = (gradeId) => {
    setUserGradeId(gradeId.value);
  };

  const getAvailableBattles = () =>
    data.filter(
      (battle) =>
        (battle.type === 'realtime' &&
          moment().isBefore(moment(battle?.startTime))) ||
        (battle.type === 'freedom' &&
          moment().isBefore(moment(battle?.expirationTime)))
    );

  return (
    <Layout isOrange animationOff={animationOff}>
      <BattleDashboard
        loading={loading}
        data={getAvailableBattles()}
        battleGradeId={userGradeId}
        onChangeBattleGrade={handleUpdateGrade}
        animationOff={animationOff}
      />
    </Layout>
  );
};

export default withAuthenticatedUser(
  withToast(
    withOnBoarding(withNotificationModal(withQuestionAgent(BattlePage)))
  )
);
