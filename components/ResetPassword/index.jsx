import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Spinner from '../Common/Spinner';
import Input from '../Common/Input';
import Button from '../Common/Button';
import PromotionCard from '../Common/PromotionCard';
import { resetPassword } from '../../services/reset';
import { handleError } from '../../utils';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const defaultObject = {
    value: '',
    isError: false,
    errorMessage: ''
  };

  const [email, setEmail] = useState(defaultObject);
  const [password, setPassword] = useState(defaultObject);
  const [loading, setLoading] = useState(false);

  const EMPTY_FIELD_ERROR_MSG = 'Bạn quên nhập nè';

  const showSuccessToast = (message) => toast.success(message);

  useEffect(() => {
    const autoEmail = localStorage.getItem('autoEmail');
    if (autoEmail) setEmail({ ...email, value: autoEmail });
    localStorage.setItem('autoEmail', '');
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!validateAllFields()) return;
    handleResetPassword();
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await resetPassword({ email: email.value });
      showSuccessToast(
        'Nếu địa chỉ email của bạn tồn tại trong hệ thống, XAGOe sẽ gửi hướng dẫn lấy lại mật khẩu đến bạn ngay bây giờ.'
      );
      setEmail({ ...email, value: '' });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
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

    return valid;
  };

  const handleSigninClick = () => {
    Router.push('/login');
  };

  return (
    <>
      <Spinner enable={loading}></Spinner>

      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1 className={cn(styles.loginHeader, 'has-margin-bottom-3')}>
            LẤY LẠI MẬT KHẨU
          </h1>
          <p className="has-text-centered has-margin-bottom-5 has-text-grey-dark has-text-weight-semibold ">
            Vui lòng nhập email của bạn. Chúng tôi sẽ gửi cho bạn hướng dẫn về
            cách lấy lại mật khẩu.
          </p>
          <form>
            <div className="field has-margin-bottom-5">
              <div className="is-flex has-justify-between ">
                {!!email.isError && (
                  <div className="has-text-danger has-text-weight-semibold text-is-14 has-margin-bottom-2">
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

            <div className="field has-margin-bottom-5">
              <div
                className={cn('control has-text-centered', styles.customButton)}
              >
                <Button size="medium" onClick={handleSubmit} type="submit">
                  TIẾP TỤC
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

export default ResetPassword;
