import Router from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import cn from 'classnames';
import Spinner from '../Common/Spinner';
import { signup } from '../../services/signup';
import Input from '../Common/Input';
import Button from '../Common/Button';
import PromotionCard from '../Common/PromotionCard';
import { DISPLAY_NAME_MAX_LENGTH } from '../../constants';

const Signup = () => {
  const defaultObject = {
    value: '',
    isError: false,
    errorMessage: ''
  };

  const [email, setEmail] = useState(defaultObject);
  const [password, setPassword] = useState(defaultObject);
  const [displayName, setDisplayName] = useState(defaultObject);
  const [loading, setLoading] = useState(false);

  const USER_EXISTED_ERROR_CODE = 'E__REGISTER_EXISTED_USER';
  const USER_EXISTED_ERROR_MSG = 'Email này đã được sử dụng';

  const UNKNOWN_ERROR_MSG = 'Có lỗi đã xảy ra. Xin vui lòng trở lại sau.';
  const EMPTY_FIELD_ERROR_MSG = 'Bạn quên nhập nè';

  const handleRegisterClick = (evt) => {
    evt.preventDefault();

    if (!validateAllFields()) return;
    setLoading(true);

    register();
  };

  const register = async () => {
    try {
      const res = await signup({
        email: email.value,
        password: password.value,
        displayName: displayName.value
      });

      handleRegisterSuccess(res);
    } catch (error) {
      handleRegisterFailed(error?.response);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSuccess = (response) => {
    localStorage.setItem('auth', 'created');
    Router.push('/login');
  };

  const handleRegisterFailed = (response) => {
    switch (response?.data?.code) {
      case USER_EXISTED_ERROR_CODE:
        setEmail({
          ...email,
          isError: true,
          errorMessage: USER_EXISTED_ERROR_MSG
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
        setEmail({ ...email, isError: true, errorMessage: '' });
        setPassword({ ...password, isError: true, errorMessage: '' });
        setDisplayName({
          ...displayName,
          isError: true,
          errorMessage: UNKNOWN_ERROR_MSG
        });
        break;
    }
  };

  const validateAllFields = () => {
    let valid = true;

    setEmail({ ...email, isError: false });
    setPassword({ ...password, isError: false });
    setDisplayName({ ...displayName, isError: false });

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

    if (!displayName.value) {
      valid = false;
      setDisplayName({
        ...displayName,
        isError: true,
        errorMessage: EMPTY_FIELD_ERROR_MSG
      });
    }

    return valid;
  };

  const [passwordType, setPasswordType] = useState('password');
  const handleTogglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleSigninClick = () => {
    Router.push('/login');
  };

  return (
    <>
      <Spinner enable={loading}></Spinner>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1 className={cn(styles.loginHeader, 'has-margin-bottom-5')}>
            ĐĂNG KÝ TÀI KHOẢN XAGOe
          </h1>

          <form>
            <div className="field has-margin-bottom-4">
              <div className="is-flex has-justify-between">
                {!!email.isError && (
                  <div className="has-text-danger has-text-weight-medium has-margin-bottom-2 text-is-14">
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

            <div className="field has-margin-bottom-4">
              <div className="is-flex has-justify-between">
                {!!password.isError && (
                  <div className="has-text-danger has-text-weight-medium has-margin-bottom-2 text-is-14">
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

            <div className="field has-margin-bottom-5">
              <div className="is-flex has-justify-between">
                {!!displayName.isError && (
                  <div className="has-text-danger has-text-weight-medium has-margin-bottom-2 text-is-14">
                    {displayName.errorMessage}
                  </div>
                )}
              </div>
              <div className="control">
                <Input
                  isError={displayName.isError}
                  placeholder="Tên hiển thị"
                  type="text"
                  value={displayName.value}
                  onValueChange={(evt) => {
                    setDisplayName({ ...displayName, value: evt.target.value });
                  }}
                  maxLength={DISPLAY_NAME_MAX_LENGTH}
                ></Input>
              </div>
            </div>

            <div className="field has-margin-bottom-5">
              <div
                className={cn('control has-text-centered', styles.customButton)}
              >
                <Button
                  size="medium"
                  onClick={handleRegisterClick}
                  type="submit"
                >
                  ĐĂNG KÝ
                </Button>
              </div>
            </div>
          </form>
          <div className="has-margin-bottom-5 has-text-weight-medium has-text-centered">
            <span>
              Bằng việc đăng ký tài khoản, bạn đã đồng ý với XAGOe <br /> về{' '}
              <Link href="/terms">
                <a href="/terms" target="_blank">
                  <b>Điều khoản dịch vụ và Chính sách bảo mật</b>
                </a>
              </Link>
              , xin cảm ơn!
            </span>
          </div>
        </div>

        <PromotionCard
          title="Đã có tài khoản?"
          subtitle="Đừng quên bạn có thể sử dụng tài khoản Facebook hoặc Google để đăng nhập XAGOe nhé!"
        >
          <Button
            size="medium"
            outlineGradient
            className={cn(styles.outlineButton)}
            onClick={handleSigninClick}
          >
            <span className="text-is-purple-gradient is-family-primary">
              Đăng nhập
            </span>
          </Button>
        </PromotionCard>
      </div>
    </>
  );
};

export default Signup;
