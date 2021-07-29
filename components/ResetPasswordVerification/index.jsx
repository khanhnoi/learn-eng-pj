import Router from 'next/router';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Spinner from '../Common/Spinner';
import Input from '../Common/Input';
import Button from '../Common/Button';
import PromotionCard from '../Common/PromotionCard';
import { updatePassword } from '../../services/reset';
import { toast } from 'react-toastify';
import { handleError } from '../../utils';

const ResetPasswordVerification = ({ token }) => {
  const defaultObject = {
    value: '',

    isError: false,
    errorMessage: ''
  };

  const [confirmPassword, setConfirmPassword] = useState(defaultObject);
  const [password, setPassword] = useState(defaultObject);
  const [loading, setLoading] = useState(false);

  const EMPTY_FIELD_ERROR_MSG = 'Bạn quên nhập nè';

  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!validateAllFields()) return;
    handleResetPassword();
  };

  const handleResponseError = (error) => {
    const { response } = error;

    switch (response?.data?.code) {
      case 'E__INVALID_PARAMETER':
        setConfirmPassword({
          ...confirmPassword,
          isError: true,
          errorMessage: ''
        });

        setPassword({
          ...password,
          isError: true,
          errorMessage: 'Mật khẩu tối thiểu 8 kí tự bạn nhé'
        });
        break;

      case 'E__RESET_PASSWORD_TOKEN_INVALID':
        showErrorToast(
          'Link không chính xác hoặc đã hết hạn. Bạn vui lòng gửi lại email thay đổi mật khẩu khác nhé.'
        );
        break;
      default:
        handleError(error);
        break;
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await updatePassword({ password: password.value, token });
      showSuccessToast('Đổi mật khẩu thành công.');
      Router.replace('/battle');
    } catch (error) {
      handleResponseError(error.response);
    } finally {
      setLoading(false);
    }
  };

  const validateAllFields = () => {
    let valid = true;

    setPassword({ ...password, isError: false });
    setConfirmPassword({ ...confirmPassword, isError: false });

    if (!password.value) {
      valid = false;
      setPassword({
        ...password,
        isError: true,
        errorMessage: EMPTY_FIELD_ERROR_MSG
      });
    }

    if (!confirmPassword.value) {
      valid = false;
      setConfirmPassword({
        ...confirmPassword,
        isError: true,
        errorMessage: EMPTY_FIELD_ERROR_MSG
      });
    }

    if (password.value !== confirmPassword.value) {
      valid = false;
      setPassword({
        ...password,
        isError: true,
        errorMessage: 'Mật khẩu không khớp'
      });

      setConfirmPassword({
        ...confirmPassword,
        isError: true,
        errorMessage: ''
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

    if (valid && confirmPassword.value.length < 8) {
      valid = false;
      setConfirmPassword({
        ...confirmPassword,
        isError: true,
        errorMessage: 'Mật khẩu tối thiểu 8 kí tự bạn nhé'
      });
    }

    return valid;
  };

  const handleSigninClick = () => {
    Router.push('/login');
  };

  const [passwordType, setPasswordType] = useState('password');
  const handleTogglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const handleToggleConfirmPassword = () => {
    setConfirmPasswordType(
      confirmPasswordType === 'password' ? 'text' : 'password'
    );
  };

  return (
    <>
      <Spinner enable={loading}></Spinner>

      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1 className={cn(styles.loginHeader, 'has-margin-bottom-5')}>
            NHẬP MẬT KHẨU MỚI
          </h1>
          <form>
            <div className="field has-margin-bottom-4">
              <div className="is-flex has-justify-between ">
                {!!password.isError && (
                  <div className="has-text-danger has-text-weight-semibold text-is-14 has-margin-bottom-2">
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
              <div className="is-flex has-justify-between ">
                {!!confirmPassword.isError && (
                  <div className="has-text-danger has-text-weight-semibold text-is-14 has-margin-bottom-2">
                    {confirmPassword.errorMessage}
                  </div>
                )}
              </div>
              <div className="control">
                <Input
                  isError={confirmPassword.isError}
                  placeholder="Xác nhận mật khẩu"
                  type={confirmPasswordType}
                  value={confirmPassword.value}
                  onValueChange={(evt) => {
                    setConfirmPassword({
                      ...confirmPassword,
                      value: evt.target.value
                    });
                  }}
                  iconName={
                    confirmPasswordType === 'password'
                      ? 'icon-eye'
                      : 'icon-eye-no'
                  }
                  isIconRight
                  onIconClick={handleToggleConfirmPassword}
                ></Input>
              </div>
            </div>

            <div className="field has-margin-bottom-5">
              <div
                className={cn('control has-text-centered', styles.customButton)}
              >
                <Button size="medium" onClick={handleSubmit} type="submit">
                  ĐỔI MẬT KHẨU
                </Button>
              </div>
            </div>
          </form>
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

export default ResetPasswordVerification;
