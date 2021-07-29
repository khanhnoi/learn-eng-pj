import React, { useState, useEffect } from 'react';
import Landing from '../components/Landing';
import Router from 'next/router';
import Spinner from '../components/Common/Spinner';

const LandingPage = () => {
  const [isAuthen, setIsAuthen] = useState(false);
  const [checkAuth, setCheckAuth] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setIsAuthen(true);
    } else {
      setCheckAuth(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthen) Router.replace('/battle');
  }, [isAuthen]);

  if (checkAuth) return <Spinner enable showLogo />;

  return <Landing />;
};

export default LandingPage;
