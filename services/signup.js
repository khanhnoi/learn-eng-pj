import * as axios from 'axios';
import { SIGNUP_API, VERIFY_API } from './utils';

const signup = (params) => {
  const { email, password, displayName } = params;

  return axios({
    method: 'post',
    url: SIGNUP_API,
    data: {
      email,
      password,
      displayName
    }
  });
};

const verify = (params) => {
  const { token } = params;

  return axios({
    method: 'post',
    url: VERIFY_API,
    data: {
      token
    },
    withCredentials: true
  });
};

export { signup, verify };
