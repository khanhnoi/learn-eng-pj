import React from 'react';
import Layout from '../components/Layout';
import CompetitionConfiguration from '../components/CompetitionConfiguration';
import { withAuthenticatedUser } from '../services/auth';
import withQuestionAgent from '../components/HOCComponent/WithQuestionAgent';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    return (
      <Layout animationOff={animationOff}>
        <CompetitionConfiguration animationOff={animationOff} />
      </Layout>
    );
  })
);
