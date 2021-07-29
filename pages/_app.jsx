import React from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import App from 'next/app';
import '../scss/styles.scss';
import '../static/css/fontello.css';
import '../static/css/fontello-codes.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropdown/style.css';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';
import NextNProgress from 'nextjs-progressbar';
import * as axios from 'axios';
import { logout } from '../services/auth';
import { User } from '../hooks/useUser';
import { Competition } from '../hooks/useCompetition';
import { Notification } from '../hooks/useNotification';
import 'moment/locale/vi';
import { useRouter } from 'next/router';
import MobileDashboard from '../components/MobileDashboard';

toast.configure({
  position: 'bottom-center',
  newestOnTop: true,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    maxWidth: 722,
    width: '100%'
  }
});

moment.updateLocale('vi', {
  calendar: {
    sameDay: '[Hôm nay,] hh:mmA',
    nextDay: '[Ngày mai,] hh:mmA',
    nextWeek: 'DD/MM - hh:mmA',
    lastDay: '[Hôm qua,] hh:mmA',
    lastWeek: 'DD/MM - hh:mmA',
    sameElse: 'DD/MM - hh:mmA'
  }
});

axios.default.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      logout();
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default class MyApp extends App {
  state = {
    userData: {}
  };

  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        prerenderedData: {
          currentYear: new Date().getFullYear(),
          serverMoment: moment()
        }
      },
      pathname: ctx.pathname
    };
  }

  state = {
    isMobile: false
  };

  componentDidMount() {
    document.documentElement.classList.add('has-navbar-fixed-top');
    if (process.env.NODE_ENV !== 'production') {
      const axe = require('react-axe');
      axe(React, ReactDOM, 1000);
    }

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.setState({ isMobile: true });
    }
  }

  render() {
    const { Component, pageProps, pathname } = this.props;

    if (this.state.isMobile && pathname !== '/') return <MobileDashboard />;

    return (
      <>
        <Head>
          <title>XAGOe</title>
        </Head>
        <Notification.Provider>
          <Competition.Provider>
            <User.Provider>
              <NextNProgress color="#1E86FF" height="2" />
              <Component {...pageProps} />
            </User.Provider>
          </Competition.Provider>
        </Notification.Provider>
      </>
    );
  }
}
