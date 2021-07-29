import React from 'react';
import ResetPassword from '../components/ResetPassword';
import Layout from '../components/Layout';

export default ({ animationOff }) => {
  return (
    <Layout isPublic animationOff={animationOff}>
      <ResetPassword></ResetPassword>
    </Layout>
  );
};
