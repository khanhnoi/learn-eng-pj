import React from 'react';
import Head from 'next/head';
import { getPublicCompetition } from '../../services/competition';
import { handleError } from '../../utils';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const CompetitionSharePage = ({ title, image, description }) => {
  const router = useRouter();
  const getUrlMeta = () => {
    return `${process.env.WEB_URL}${router.asPath}`;
  };

  const getFacebookAppId = () => {
    return `${process.env.FACEBOOK_APP_ID}`;
  };

  return (
    <Layout isWide={true}>
      <Head>
        <title>XAGOe - Đấu trường tri thức</title>
        <meta property="fb:app_id" content={getFacebookAppId()} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={getUrlMeta()} />
      </Head>
    </Layout>
  );
};

CompetitionSharePage.getInitialProps = async () => {
  try {
    const competition = await getPublicCompetition();
    return {
      title: 'Đấu trường thách đấu XAGOe - Thách đấu từ Tuấn Nguyễn',
      description: 'Lời mời thách đấu từ Tuấn Nguyễn. Challenge me!',
      image:
        'https://static.ybox.vn/2016/03/29/cuoc-thi-tieng-anh-chuyen-nganh-Akkology.jpg'
    };
  } catch (error) {
    handleError(error);
  }
};

export default CompetitionSharePage;
