import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { verify } from '../../services/signup';
import Spinner from '../../components/Common/Spinner';
import { handleError } from '../../utils';

export default () => {
  const router = useRouter();
  const [content, setContent] = useState('Vui lòng đợi trong giây lát...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      await verify({
        token: router.query.token
      });

      handleVerifySuccess();
    } catch (error) {
      handleError(error);
      handleVerifyFailed(error?.response);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySuccess = () => {
    localStorage.setItem('auth', 'verified');
    Router.replace('/battle');
  };

  const handleVerifyFailed = (response) => {
    if (response?.data?.code === 'E__ACTIVATE_VERIFIED_USER') {
      Router.replace('/login');
    }
  };

  return (
    <div
      className="is-flex has-item-center has-justify-center"
      style={{ width: '100%', height: '100%' }}
    >
      <Spinner enable={loading}></Spinner>
      <h1 className="is-size-3 has-text-center has-margin-top-8">{content}</h1>
    </div>
  );
};
