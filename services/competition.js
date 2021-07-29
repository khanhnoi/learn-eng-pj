import * as axios from 'axios';
import {
  GET_MY_COMPETITIONS,
  CREATE_COMPETITION,
  GET_COMPETITION,
  SUBMIT_COMPETITION,
  START_COMPETITION_PARTICIPANT,
  GET_QUIZZES,
  GET_PUBLIC_COMPETITION,
  GET_COMPETITION_PARTICIPANT,
  START_COMPETITION,
  ACCEPT_COMPETITION_PARTICIPANT,
  DECLINE_COMPETITION_PARTICIPANT,
  GET_COMPETITION_RESULT,
  ACCEPT_PUBLIC_COMPETITION
} from './utils';

const getMyCompetitions = (params) => {
  return axios.get(GET_MY_COMPETITIONS, { params, withCredentials: true });
};

const getCompetitionFromPublic = (body) => {
  return axios({
    method: 'post',
    url: ACCEPT_PUBLIC_COMPETITION,
    data: body,
    withCredentials: true
  });
}

const getCompetition = (competitionId) => {
  const url = `${GET_COMPETITION}/${competitionId}`;
  return axios.get(url, { withCredentials: true });
};

const getCompetitionParticipant = (competitionId) => {
  const url = `${GET_COMPETITION_PARTICIPANT(competitionId)}`;
  return axios.get(url, { withCredentials: true });
};

const getCompetitionResult = (competitionId, params) => {
  const url = `${GET_COMPETITION_RESULT(competitionId)}`;
  return axios.get(url, { params, withCredentials: true });
};

const createCompetition = (body) => {
  return axios({
    method: 'post',
    url: CREATE_COMPETITION,
    data: body,
    withCredentials: true
  });
};

const submitCompetition = (competitionId, participantId, body) => {
  return axios({
    method: 'post',
    url: SUBMIT_COMPETITION(competitionId, participantId),
    data: body,
    withCredentials: true
  });
};

const startCompetitionParticipant = (competitionId, participantId, body) => {
  return axios({
    method: 'post',
    url: START_COMPETITION_PARTICIPANT(competitionId, participantId),
    data: body,
    withCredentials: true
  });
};

const acceptCompetitionParticipant = (competitionId, participantId, body) => {
  return axios({
    method: 'post',
    url: ACCEPT_COMPETITION_PARTICIPANT(competitionId, participantId),
    data: body,
    withCredentials: true
  });
};
const declineCompetitionParticipant = (competitionId, participantId, body) => {
  return axios({
    method: 'post',
    url: DECLINE_COMPETITION_PARTICIPANT(competitionId, participantId),
    data: body,
    withCredentials: true
  });
};
const startCompetition = (competitionId, body) => {
  return axios({
    method: 'post',
    url: START_COMPETITION(competitionId),
    data: body,
    withCredentials: true
  });
};

const getQuizzes = (participantId, params) => {
  const url = `${GET_QUIZZES(participantId)}`;
  return axios.get(url, { withCredentials: true, params });
};

const getPublicCompetition = () => {
  return axios.get(GET_PUBLIC_COMPETITION, { withCredentials: false });
};

export {
  getMyCompetitions,
  createCompetition,
  getCompetitionParticipant,
  startCompetitionParticipant,
  startCompetition,
  acceptCompetitionParticipant,
  declineCompetitionParticipant,
  submitCompetition,
  getCompetition,
  getCompetitionResult,
  getQuizzes,
  getPublicCompetition,
  getCompetitionFromPublic
};
