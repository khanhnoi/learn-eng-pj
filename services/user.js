import * as axios from 'axios';
import {
  GET_CURRENT_USER_API,
  SEACH_USERS,
  GET_OTHER_USER_API,
  UPDATE_USER_INFO_API,
  CHANGE_PASSWORD_API,
  GET_CURRENT_USER_STATS_API,
  GET_OTHER_USER_STATS_API
} from './utils';

const getUser = () => {
  return axios.get(GET_CURRENT_USER_API, { withCredentials: true });
};

const getUserById = (id) => {
  return axios.get(`${GET_OTHER_USER_API}/${id}`, { withCredentials: true });
};

const updateUserInfo = (params) => {
  return axios({
    method: 'patch',
    url: UPDATE_USER_INFO_API,
    data: {
      ...params
    },
    withCredentials: true
  });
};

const changePassword = (params) => {
  return axios({
    method: 'put',
    url: CHANGE_PASSWORD_API,
    data: {
      ...params
    },
    withCredentials: true
  });
};

const getUserStats = () => {
  return axios.get(GET_CURRENT_USER_STATS_API, { withCredentials: true });
};

const getUserStatsById = (id) => {
  return axios.get(GET_OTHER_USER_STATS_API(id), { withCredentials: true });
};

const searchUsers = (params) => {
  return axios.get(SEACH_USERS, { withCredentials: true, params });
};

export {
  getUser,
  searchUsers,
  getUserById,
  updateUserInfo,
  changePassword,
  getUserStats,
  getUserStatsById
};
