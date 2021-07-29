import {
  AUTH_FACEBOOK_API,
  AUTH_GOOGLE_API,
  AUTH_LOCAL_LOGIN_API
} from './utils';

import * as axios from 'axios';

const loginByFaceBook = () => {
  window.location.href = AUTH_FACEBOOK_API;
};

const loginByGoogle = () => {
  window.location.href = AUTH_GOOGLE_API;
};

const loginByUser = (params) => {
  const { email, password } = params;

  return axios({
    method: 'post',
    url: AUTH_LOCAL_LOGIN_API,
    data: {
      email,
      password
    },
    withCredentials: true
  });
};

export { loginByFaceBook, loginByGoogle, loginByUser };
