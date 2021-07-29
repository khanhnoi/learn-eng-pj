import { SUBSCRIPTION_EMAIL_API, SUBMIT_QUESTION_API } from './utils';
import * as axios from 'axios';

export const subscribeEmailToXagoe = (params) => {
  const { email } = params;
  return axios({
    method: 'post',
    url: SUBSCRIPTION_EMAIL_API,
    data: {
      email
    }
  });
};

export const submitQuestionToXagoe = (params) => {
  const { name, email, question } = params;

  return axios({
    method: 'post',
    url: SUBMIT_QUESTION_API,
    data: {
      name,
      email,
      question
    }
  });
};
