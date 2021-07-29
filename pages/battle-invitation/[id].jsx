import React, { useEffect } from 'react';
import Head from 'next/head';
// import { getPublicCompetition } from '../../services/competition';
import { handleError } from '../../utils';
import Router, { useRouter } from 'next/router';
import Spinner from '../../components/Common/Spinner';

const CompetitionSharePage = ({ title, image, description }) => {
  const router = useRouter();
  const getUrlMeta = () => {
    return `${process.env.WEB_URL}${router.asPath}`;
  };

  const getFacebookAppId = () => {
    return `${process.env.FACEBOOK_APP_ID}`;
  };

  useEffect(() => {
    const { id } = router.query;
    Router.replace(`/battle-lobby/${id}`);
  }, []);

  return (
    <>
      <Spinner showLogo enable />
      <Head>
        <title>XAGOe - Đấu trường tri thức</title>
        <meta property="fb:app_id" content={getFacebookAppId()} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={getUrlMeta()} />
      </Head>
    </>
  );
};

CompetitionSharePage.getInitialProps = async () => {
  try {
    return {
      title: 'Đấu trường tri thức XAGOe - Sàn đấu thời gian thực',
      description:
        'Tham gia trận đấu để so tài trí tuệ cùng hàng trăm người chơi khác!!!',
      image: 'https://xagoe-dev.s3.amazonaws.com/1594027495509-join-xagoe.png'
    };
  } catch (error) {
    handleError(error);
  }
};

export default CompetitionSharePage;
