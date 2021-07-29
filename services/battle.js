import * as axios from 'axios';
import {
  SUBMIT_BATTLE,
  GET_MY_BATTLES,
  START_BATTLE_PARTICIPANT,
  GET_BATTLE_RESULT,
  GET_BATTLE,
  GET_BATTLE_PARTICIPANT,
  GET_BATTLE_RANK
} from './utils';

const getMyBattles = (params) => {
  return axios.get(GET_MY_BATTLES, { params, withCredentials: true });
};

const getBattle = (battleId) => {
  const url = `${GET_BATTLE}/${battleId}`;
  return axios.get(url, { withCredentials: true });
};

const getBattleParticipant = (battleId) => {
  const url = `${GET_BATTLE_PARTICIPANT(battleId)}`;
  return axios.get(url, { withCredentials: true });
};

const getBattleResult = (battleId, params) => {
  const url = `${GET_BATTLE_RESULT(battleId)}`;
  return axios.get(url, { params, withCredentials: true });
};

const submitBattle = (battleId, body) => {
  return axios({
    method: 'post',
    url: SUBMIT_BATTLE(battleId),
    data: body,
    withCredentials: true
  });
};

const startBattleParticipant = (battleId) => {
  return axios({
    method: 'post',
    url: START_BATTLE_PARTICIPANT(battleId),
    withCredentials: true
  });
};

const getBattleRank = (params) => {
  return axios.get(GET_BATTLE_RANK, { params, withCredentials: true });
};

export {
  getMyBattles,
  startBattleParticipant,
  getBattleParticipant,
  submitBattle,
  getBattle,
  getBattleResult,
  getBattleRank
};
