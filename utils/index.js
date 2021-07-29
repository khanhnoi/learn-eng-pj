import { toast } from 'react-toastify';
import React from 'react';
import ErrorMessages from './error-messages';
import MathJax from 'react-mathjax-preview';

export const handleError = (error) => {
  const response = error.response;
  console.error('__error', error);
  if (response && response.data && response.data.code) {
    const message = ErrorMessages[response.data.code] || response.data.code;
    return toast.error(message);
  }
  if (response && response.data) {
    if (ErrorMessages[response.data]) {
      return toast.error(ErrorMessages[response.data]);
    }
    return toast.error(response.data);
  }
  return toast.error('Không thể kết nối đến máy chủ.');
};

export const isMathJaxPreview = (text) => {
  return (
    text?.includes('MathJax_Preview') ||
    text?.includes('$') ||
    text?.includes('<x<') ||
    text?.includes('mstyle') ||
    text?.includes('MJXc')
  );
};

export const renderCodeMaxJax = (input) => {
  if (isMathJaxPreview(input)) {
    const mathJax = (
      <MathJax math={input} style={{ display: 'inline-block' }} />
    );
    return mathJax;
  }
  return input;
};
