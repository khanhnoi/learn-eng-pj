import React from 'react';
import ExaminationReview from '../../components/ExaminationReview';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { withAuthenticatedUser } from '../../services/auth';
import withQuestionAgent from '../../components/HOCComponent/WithQuestionAgent';

export default withAuthenticatedUser(
  withQuestionAgent(({ animationOff }) => {
    const onExit = async () => {
      Router.replace('/battle');
    };

    return (
      <Layout isWide={true} animationOff={animationOff}>
        <ExaminationReview
          type="battle"
          onExit={onExit}
          animationOff={animationOff}
        />
      </Layout>
    );
  })
);
