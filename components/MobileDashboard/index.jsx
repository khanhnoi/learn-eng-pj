import React from 'react';
import cn from 'classnames';
import Head from 'next/head';
import styles from './styles.module.scss';
import {
  XAGOE_FB_URL,
  XAGOE_YOUTUBE_URL,
  XAGOE_INSTA_URL
} from '../../constants';

const MobileDashboard = () => {
  return (
    <>
      <Head>
        <title>XAGOe</title>
      </Head>
      <div className={cn(styles.mobileContainer)}>
        <img
          src="/static/img/xagoe_logo.svg"
          alt="logo"
          className={cn(styles.logo)}
        />
        <img
          src="/static/img/img-mobile-dashboard.svg"
          alt="sorry"
          className={cn(styles.mobilePic)}
        />

        <p className={cn(styles.desc, styles.gradient)}>
          Hãy khám phá XAGOe trên máy tính <br /> hoặc laptop bạn nhé ! <br />
        </p>

        <p className={cn(styles.desc)}>
          XAGOe phiên bản điện thoại sẽ sớm được <br />
          ra mắt trong thời gian tới.
          <br />
          Bạn đợi XAGOe thêm một chút nữa nhé !!
        </p>

        <div className={cn(styles.findMore)}>Tìm hiểu thêm về XAGOe tại</div>

        <div className={cn(styles.iconsContainer)}>
          <a href={XAGOE_FB_URL} rel="noopener noreferrer" target="_blank">
            <img
              className={cn(styles.icon, styles.iconFb)}
              src="/static/img/icons/icon-facebook-round.svg"
              alt="fb"
            />
          </a>
          <a href={XAGOE_YOUTUBE_URL} rel="noopener noreferrer" target="_blank">
            <img
              className={cn(styles.icon, styles.iconYoutube)}
              src="/static/img/icons/icon-youtube.svg"
              alt="youtube"
            />
          </a>
          <a href={XAGOE_INSTA_URL} rel="noopener noreferrer" target="_blank">
            <img
              className={cn(styles.icon, styles.iconInsta)}
              src="/static/img/icons/icon-instagram.svg"
              alt="insta"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileDashboard;
