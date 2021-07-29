import * as axios from 'axios';
import {
  GET_MY_CHALLENGES,
  GET_MY_CHALLENGE_STATS,
  START_CHALLENGE_PARTICIPANT,
  SUBMIT_CHALLENGE,
  GET_CHALLENGE_RESULT
} from './utils';

const getMyChallenges = (params) => {
  return axios.get(GET_MY_CHALLENGES, { params, withCredentials: true });
};

const getMyChallengeStats = (params) => {
  return axios.get(GET_MY_CHALLENGE_STATS, { params, withCredentials: true });
};

const startChallengeParticipant = (challengeId) => {
  return axios({
    method: 'post',
    url: START_CHALLENGE_PARTICIPANT(challengeId),
    withCredentials: true
  });
};

const submitChallenge = (challengeId, body) => {
  return axios({
    method: 'post',
    url: SUBMIT_CHALLENGE(challengeId),
    data: body,
    withCredentials: true
  });
};

const getChallengeResult = (challengeId, params) => {
  const url = `${GET_CHALLENGE_RESULT(challengeId)}`;
  return axios.get(url, { params, withCredentials: true });
};

export {
  getMyChallenges,
  getMyChallengeStats,
  startChallengeParticipant,
  submitChallenge,
  getChallengeResult
};
