import React from 'react';
import Layout from '../components/Layout';
import { ChallengeDashboard } from '../components/ChallengeDashboard';
import { withAuthenticatedUser } from '../services/auth';
import withNotificationModal from '../components/HOCComponent/WithNotificationModal';
import withQuestionAgent from '../components/HOCComponent/WithQuestionAgent';

export default withAuthenticatedUser(
  withNotificationModal(
    withQuestionAgent(({ animationOff }) => {
      return (
        <Layout animationOff={animationOff}>
          <ChallengeDashboard animationOff={animationOff} />
        </Layout>
      );
    })
  )
);
