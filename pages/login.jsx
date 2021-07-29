import React from 'react';
import Login from '../components/Login';
import Layout from '../components/Layout';
import withToast from '../components/HOCComponent/WithToast';
import { withCheckAuthenUser } from '../services/auth';

const LoginPage = ({ animationOff }) => {
  return (
    <Layout isPublic animationOff={animationOff}>
      <Login></Login>
    </Layout>
  );
};

export default withCheckAuthenUser(withToast(LoginPage));
