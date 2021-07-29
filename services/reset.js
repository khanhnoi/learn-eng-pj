import * as axios from 'axios';
import { RESET_PASSWORD_API, UPDATE_PASSWORD_API } from './utils';

const resetPassword = (params) => {
  const { email } = params;

  return axios({
    method: 'post',
    url: RESET_PASSWORD_API,
    data: {
      email
    },
    withCredentials: true
  });
};

const updatePassword = (params) => {
  const { password, token } = params;

  return axios({
    method: 'post',
    url: UPDATE_PASSWORD_API,
    data: {
      password,
      token
    },
    withCredentials: true
  });
};

export { resetPassword, updatePassword };
