export const AUTH_FACEBOOK_API = `${process.env.API_URL}/auth/facebook`;
export const AUTH_GOOGLE_API = `${process.env.API_URL}/auth/google`;
export const AUTH_LOCAL_LOGIN_API = `${process.env.API_URL}/auth/login`;
export const SIGNUP_API = `${process.env.API_URL}/auth/signup`;
export const LOGOUT_API = `${process.env.API_URL}/auth/logout`;
export const VERIFY_API = `${process.env.API_URL}/auth/verify`;
export const RESET_PASSWORD_API = `${process.env.API_URL}/auth/reset-password`;
export const UPDATE_PASSWORD_API = `${process.env.API_URL}/auth/verify-reset-password`;
export const GET_FIREBASE_TOKEN = `${process.env.API_URL}/firebase/token`;
export const GET_CURRENT_USER_API = `${process.env.API_URL}/me`;
export const GET_CURRENT_USER_STATS_API = `${process.env.API_URL}/me/stats`;
export const GET_OTHER_USER_STATS_API = (id) =>
  `${process.env.API_URL}/user/${id}/stats`;
export const UPDATE_USER_INFO_API = `${process.env.API_URL}/me`;

export const CHANGE_PASSWORD_API = `${process.env.API_URL}/me/password`;
export const GET_OTHER_USER_API = `${process.env.API_URL}/user`;
export const SEACH_USERS = `${process.env.API_URL}/user`;
export const GET_MY_COMPETITIONS = `${process.env.API_URL}/competition/me`;
export const GET_COMPETITION = `${process.env.API_URL}/competition`;

export const GET_COMPETITION_PARTICIPANT = (id) =>
  `${process.env.API_URL}/competition/${id}/participant`;
export const GET_QUIZZES = (id) =>
  `${process.env.API_URL}/participant/${id}/quiz`;
export const CREATE_COMPETITION = `${process.env.API_URL}/competition`;
export const ACCEPT_PUBLIC_COMPETITION = `${process.env.API_URL}/competition/from-public`;
export const PARTICIPANT_API = `${process.env.API_URL}/participant`;
export const SUBMIT_COMPETITION = (competitionId, participantId) =>
  `${process.env.API_URL}/competition/${competitionId}/participant/${participantId}/submit`;
export const SUBSCRIPTION_EMAIL_API = `${process.env.CMS_URL}/publicSubscription`;
export const SUBMIT_QUESTION_API = `${process.env.CMS_URL}/publicQuestion`;
export const START_COMPETITION_PARTICIPANT = (competitionId, participantId) =>
  `${process.env.API_URL}/competition/${competitionId}/participant/${participantId}/start`;
export const ACCEPT_COMPETITION_PARTICIPANT = (competitionId, participantId) =>
  `${process.env.API_URL}/competition/${competitionId}/participant/${participantId}/accept`;
export const DECLINE_COMPETITION_PARTICIPANT = (competitionId, participantId) =>
  `${process.env.API_URL}/competition/${competitionId}/participant/${participantId}/decline`;
export const START_COMPETITION = (competitionId) =>
  `${process.env.API_URL}/competition/${competitionId}/start`;
export const GET_COMPETITION_RESULT = (id) =>
  `${process.env.API_URL}/competition/${id}/result`;
export const REVIEW_QUIZ = (id) => `${process.env.API_URL}/quiz/${id}/review`;
export const GET_PUBLIC_COMPETITION =
  'https://jsonplaceholder.typicode.com/todos/1';
export const GET_SUBJECTS = `${process.env.API_URL}/subject`;
export const GET_GRADES = `${process.env.API_URL}/grade`;
export const GET_LEVELS = `${process.env.API_URL}/level`;
export const GET_BATTLE = `${process.env.API_URL}/battle`;
export const GET_MY_BATTLES = `${process.env.API_URL}/battle/me`;
export const GET_BATTLE_RANK = `${process.env.API_URL}/battle/top`;
export const GET_SIGNED_URL = `${process.env.API_URL}/s3/signed-url`;
export const GET_BATTLE_RESULT = (id) =>
  `${process.env.API_URL}/battle/${id}/result`;
export const SUBMIT_BATTLE = (battleId) =>
  `${process.env.API_URL}/battle/${battleId}/participant-submit`;
export const START_BATTLE_PARTICIPANT = (battleId) =>
  `${process.env.API_URL}/battle/${battleId}/participant-start`;
export const GET_BATTLE_PARTICIPANT = (id) =>
  `${process.env.API_URL}/battle/${id}/participant`;

export const GET_MY_CHALLENGES = `${process.env.API_URL}/challenge/me`;
export const GET_MY_CHALLENGE_STATS = `${process.env.API_URL}/challenge/my-stats`;
export const START_CHALLENGE_PARTICIPANT = (challengeId) =>
  `${process.env.API_URL}/challenge/${challengeId}/participant-start`;
export const SUBMIT_CHALLENGE = (challengeId) =>
  `${process.env.API_URL}/challenge/${challengeId}/participant-submit`;
export const GET_CHALLENGE_RESULT = (challengeId) =>
  `${process.env.API_URL}/challenge/${challengeId}/result`;
