import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import ResetPasswordVerification from '../../components/ResetPasswordVerification';

export default ({ animationOff }) => {
  const router = useRouter();
  const token = router.query.token;
  return (
    <Layout isPublic animationOff={animationOff}>
      <ResetPasswordVerification token={token} animationOff={animationOff} />
    </Layout>
  );
};
