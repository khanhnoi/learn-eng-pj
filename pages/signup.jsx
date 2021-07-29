import React from 'react';
import Signup from '../components/Signup';
import Layout from '../components/Layout';
import { withCheckAuthenUser } from '../services/auth';

const SignupPage = ({ animationOff }) => {
  return (
    <Layout isPublic animationOff={animationOff}>
      <Signup></Signup>
    </Layout>
  );
};

export default withCheckAuthenUser(SignupPage);
