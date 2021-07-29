import * as axios from 'axios';
import { REVIEW_QUIZ } from './utils';

const reviewQuiz = (id, body) => {
  return axios({
    method: 'post',
    url: REVIEW_QUIZ(id),
    data: body,
    withCredentials: true
  });
};

export { reviewQuiz };
