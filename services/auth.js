import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { LOGOUT_API, GET_FIREBASE_TOKEN } from './utils';

import * as axios from 'axios';
import { getUser } from './user';
import { User } from '../hooks/useUser';
import { handleError } from '../utils';
import firebase from './firebase';
import Spinner from '../components/Common/Spinner';

export const auth = (ctx) => {
  const { jwt: token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.push('/login');
  }

  return token;
};

export const logout = async () => {
  try {
    await axios({
      method: 'post',
      url: LOGOUT_API,
      withCredentials: true
    });
  } catch (error) {
    console.log('error', error);
  } finally {
    // To trigger the event listener we save some random data into the `logout` key
    localStorage.setItem('user', '');
    localStorage.setItem('competitionInfo', '');
    localStorage.setItem('logout', Date.now()); // new
    Router.push('/login');
  }
};

export const getFirebaseToken = () => {
  return axios.get(`${GET_FIREBASE_TOKEN}`, { withCredentials: true });
};

export const withAuthenticatedUser = (Component) => (props) => {
  const { updateUser } = User.useContainer();
  const [loading, setLoading] = useState(true);

  const queryUserData = async () => {
    try {
      // Try to get user first
      const res = await getUser();

      // Then try to sign in Firebase
      signInFirebase();

      // If user is authenticated, update user info
      updateUser(res.data);

      // Then allow to render page
      setLoading(false);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      handleError(error);
    }
  };

  const signInFirebase = async () => {
    try {
      const token = (await getFirebaseToken()).data.token;
      firebase
        .auth()
        .signInWithCustomToken(token)
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      queryUserData();
    } else {
      updateUser(JSON.parse(user));
      setLoading(false);

      // signin firebase again
      const fbUser = firebase.auth().currentUser;
      if (!fbUser) signInFirebase();
    }
  }, []);

  if (loading) return <Spinner enable showLogo></Spinner>;
  return <Component {...props} />;
};

// For checking login & signup page
export const withCheckAuthenUser = (Component) => (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) Router.replace('/battle');
    else setLoading(false);
  }, []);

  if (loading) return <Spinner enable showLogo></Spinner>;
  return <Component {...props} />;
};
