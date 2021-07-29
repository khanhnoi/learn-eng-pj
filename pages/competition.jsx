import React from 'react';
import Layout from '../components/Layout';
import { CompetitionDashboard } from '../components/CompetitionDashboard';
import { withAuthenticatedUser } from '../services/auth';
import withNotificationModal from '../components/HOCComponent/WithNotificationModal';
import withQuestionAgent from '../components/HOCComponent/WithQuestionAgent';

export default withAuthenticatedUser(
  withNotificationModal(
    withQuestionAgent(({ animationOff }) => {
      return (
        <Layout animationOff={animationOff}>
          <CompetitionDashboard animationOff={animationOff} />
        </Layout>
      );
    })
  )
);
