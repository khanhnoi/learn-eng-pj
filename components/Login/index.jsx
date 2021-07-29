import Router from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import cn from 'classnames';
import Spinner from '../Common/Spinner';
import Button from '../Common/Button';
import Input from '../Common/Input';

import {
  loginByFaceBook,
  loginByGoogle,
  loginByUser
} from '../../services/login';
import { handleError } from '../../utils';
import PromotionCard from '../Common/PromotionCard';
import withRippleEffect from '../HOCComponent/WithRippleEffect';

const Login = () => {
  const defaultObject = {
    value: '',
    isError: false,
    errorMessage: ''
  };

  const [email, setEmail] = useState(defaultObject);
  const [password, setPassword] = useState(defaultObject);

  const [loading, setLoading] = useState(false);

  const LOGIN_ERROR_MSG = 'Sai tên đăng nhập hoặc mật khẩu';
  const EMPTY_FIELD_ERROR_MSG = 'Bạn quên nhập nè';
  const UNKNOWN_ERROR_MSG = 'Có lỗi đã xảy ra. Xin vui lòng trở lại sau.';

  const handleLogin = (evt) => {
    evt.preventDefault();

    if (!validateAllFields()) return;
    setLoading(true);
    login();
  };

  const login = async () => {
    try {
      const res = await loginByUser({
        email: email.value,
        password: password.value
      });

      if (res.status === 200) Router.replace('/battle');
    } catch (error) {
      handleLoginFailed(error?.response);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFailed = (response) => {
    switch (response?.data?.code) {
      case 'E__BAD_CREDENTIALS':
        setEmail({ ...email, isError: true, errorMessage: LOGIN_ERROR_MSG });
        setPassword({
          ...password,
          isError: true,
          errorMessage: ''
        });
        break;
      case 'E__EMAIL_IS_NOT_VERIFIED':
        setEmail({
          ...email,
          isError: true,
          errorMessage: 'Email này chưa được kích hoạt đó bạn'
        });
        break;
      case 'E__INVALID_PARAMETER':
        setEmail({
          ...email,
          isError: true,
          errorMessage: 'Địa chỉ email này không hợp lệ nhé bạn'
        });
        break;
      default:
        setEmail({ ...email, isError: true, errorMessage: UNKNOWN_ERROR_MSG });
        setPassword({
          ...password,
          isError: true,
          errorMessage: ''
        });
        break;
    }
  };

  const validateAllFields = () => {
    let valid = true;

    setEmail({ ...email, isError: false });
    setPassword({ ...password, isError: false });

    if (!email.value) {
      valid = false;
      setEmail({
        ...email,
        isError: true,
        errorMessage: EMPTY_FIELD_ERROR_MSG
      });
    }

    if (!password.value) {
      valid = false;
      setPassword({
        ...password,
        isError: true,
        errorMessage: EMPTY_FIELD_ERROR_MSG
      });
    }

    if (valid && password.value.length < 8) {
      valid = false;
      setPassword({
        ...password,
        isError: true,
        errorMessage: 'Mật khẩu tối thiểu 8 kí tự bạn nhé'
      });
    }
    return valid;
  };

  const handleLoginByFacebookClick = () => {
    setLoading(true);
    loginByFaceBook();
  };

  const handleLoginByGoogleClick = () => {
    setLoading(true);
    loginByGoogle();
  };

  const handleSignupClick = () => {
    Router.push('/signup');
  };

  const handleNavigateResetPassword = () => {
    if (email.value) {
      localStorage.setItem('autoEmail', email.value);
    }
    Router.push('/reset-password');
  };

  const [passwordType, setPasswordType] = useState('password');
  const handleTogglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const FacebookButton = ({ onClick, className, ...props }) => {
    return (
      <button
        className={cn(
          'button ',
          styles.socialButton,
          styles.facebook,
          className
        )}
        onClick={onClick}
        {...props}
      >
        <span className={cn(styles.buttonIcon, 'icon')}>
          <img src="/static/img/icons/icon-facebook.svg" alt="" />
        </span>
        <span className={cn(styles.buttonText)}>Facebook</span>
      </button>
    );
  };

  const GoogleButton = ({ onClick, className, ...props }) => {
    return (
      <button
        className={cn('button', styles.socialButton, styles.google, className)}
        onClick={onClick}
        {...props}
      >
        <span className={cn(styles.buttonIcon, 'icon')}>
          <img src="/static/img/icons/icon-google.svg" alt="" />
        </span>
        <span className={cn(styles.buttonText)}>Google</span>
      </button>
    );
  };

  const FacebookButtonWithEffect = withRippleEffect(FacebookButton);
  const GoogleButtonWithEffect = withRippleEffect(GoogleButton);
  return (
    <>
      <Spinner enable={loading}></Spinner>

      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1 className={cn(styles.loginHeader, 'has-margin-bottom-4')}>
            ĐĂNG NHẬP
          </h1>

          <div className="field is-grouped is-grouped-centered has-margin-bottom-5">
            <div className="control has-margin-right-4">
              <FacebookButtonWithEffect onClick={handleLoginByFacebookClick} />
            </div>
            <div className="control">
              <GoogleButtonWithEffect onClick={handleLoginByGoogleClick} />
            </div>
          </div>

          <div className="is-flex has-margin-bottom-4 has-text-weight-medium has-justify-center has-item-center">
            <span className="has-margin-x-3 has-text-grey-dark">
              Hoặc đăng nhập bằng tài khoản XAGOe:
            </span>
          </div>

          <form>
            <div className="field has-margin-bottom-4">
              <div className="is-flex has-justify-between ">
                {!!email.isError && (
                  <div className="has-text-danger has-text-weight-medium text-is-14 has-margin-bottom-2">
                    {email.errorMessage}
                  </div>
                )}
              </div>
              <div className="control">
                <Input
                  isError={email.isError}
                  placeholder="Email"
                  type="email"
                  value={email.value}
                  onValueChange={(evt) => {
                    setEmail({ ...email, value: evt.target.value });
                  }}
                ></Input>
              </div>
            </div>

            <div className="field has-margin-bottom-3">
              <div className="is-flex has-justify-between ">
                {!!password.isError && (
                  <div className="has-text-danger has-text-weight-medium text-is-14 has-margin-bottom-2">
                    {password.errorMessage}
                  </div>
                )}
              </div>

              <div className="control">
                <Input
                  isError={password.isError}
                  placeholder="Mật khẩu"
                  type={passwordType}
                  value={password.value}
                  onValueChange={(evt) => {
                    setPassword({ ...password, value: evt.target.value });
                  }}
                  iconName={
                    passwordType === 'password' ? 'icon-eye' : 'icon-eye-no'
                  }
                  isIconRight
                  onIconClick={handleTogglePassword}
                ></Input>
              </div>
            </div>

            <div className="has-text-right has-margin-bottom-5">
              <span
                className={cn(
                  'has-text-weight-bold text-is-purple-gradient',
                  styles.forgotPassword
                )}
                href="/reset-password"
                onClick={handleNavigateResetPassword}
                role="button"
                onKeyPress={handleNavigateResetPassword}
                tabIndex={0}
              >
                Bạn quên mật khẩu?
              </span>
            </div>

            <div className="field has-margin-bottom-3">
              <div
                className={cn('control has-text-centered', styles.customButton)}
              >
                <Button size="medium" onClick={handleLogin} type="submit">
                  ĐĂNG NHẬP
                </Button>
              </div>
            </div>
          </form>
        </div>

        <PromotionCard
          title="Chưa có tài khoản?"
          subtitle="Đăng ký tài khoản XAGOe ngay để nhận 100 coins tức thì."
        >
          <Button
            size="medium"
            outlineGradient
            className={cn(styles.outlineButton)}
            onClick={handleSignupClick}
          >
            <span className="text-is-purple-gradient is-family-primary">
              Đăng ký
            </span>
          </Button>
        </PromotionCard>
      </div>
    </>
  );
};

export default Login;
