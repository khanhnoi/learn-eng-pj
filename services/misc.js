import * as axios from 'axios';
import { GET_GRADES, GET_LEVELS, GET_SUBJECTS, GET_SIGNED_URL } from './utils';
import Compressor from 'compressorjs';

const getGrades = () => {
  return axios.get(GET_GRADES, { withCredentials: true });
};

const getLevels = () => {
  return axios.get(GET_LEVELS, { withCredentials: true });
};

const getSubjects = () => {
  return axios.get(GET_SUBJECTS, { withCredentials: true });
};

const getSignedURL = (params) => {
  return axios.get(GET_SIGNED_URL, { params, withCredentials: true });
};

const uploadFile = (url, fileData) => {
  return axios.put(url, fileData, {
    headers: {
      'Content-Type': fileData.type
    }
  });
};

const transformFile = (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.7,
      maxWidth: 240,
      maxHeight: 240,
      convertSize: 0,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      }
    });
  });
};

export {
  getGrades,
  getLevels,
  getSubjects,
  getSignedURL,
  uploadFile,
  transformFile
};
