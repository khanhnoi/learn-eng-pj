import React from 'react';
import Layout from '../components/Layout';
import { withAuthenticatedUser } from '../services/auth';
import RewardsDashboard from '../components/RewardsDashboard';
import withQuestionAgent from '../components/HOCComponent/WithQuestionAgent';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    return (
      <Layout animationOff={animationOff}>
        <RewardsDashboard />
      </Layout>
    );
  })
);
