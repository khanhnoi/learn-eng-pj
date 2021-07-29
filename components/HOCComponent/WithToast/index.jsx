import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const withToast = (Component) => (props) => {
  const showSuccessToast = (message) => toast.success(message);

  const checkToast = () => {
    const auth = localStorage.getItem('auth');

    if (auth === 'verified') {
      showSuccessToast(
        'Chúc mừng bạn đã trở thành thành viên chính thức của đấu trường XAGOe!!'
      );
      localStorage.setItem('auth', '');
    } else if (auth === 'created') {
      showSuccessToast(
        'Cảm ơn bạn đã đăng ký thành viên XAGOe. Vui lòng kích hoạt tài khoản bằng email chúng tôi vừa gửi đến bạn.'
      );
      localStorage.setItem('auth', '');
    }
  };

  useEffect(() => {
    checkToast();
  }, []);

  return <Component {...props} />;
};

export default withToast;
