import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '../Common/Button';
import Router from 'next/router';
import LandingNavbar from '../Landing/LandingNavbar';
import Navbar from '../Layout/Navbar';

const ErrorDashboard = () => {
  const [isAuthen, setIsAuthen] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setIsAuthen(true);
      setUser(JSON.parse(localUser));
    }
  }, []);

  const handleGoBackToHome = () => {
    Router.push('/');
  };

  const RenderNavbar = isAuthen ? (
    <Navbar userData={user} />
  ) : (
    <LandingNavbar
      offHighLight
      menus={[
        {
          id: 0,
          label: 'Về XAGOe',
          href: '/#ve-xagoe'
        },
        {
          id: 1,
          label: 'Tính năng',
          href: '/#tinh-nang'
        },
        {
          id: 2,
          label: 'Về chúng tôi',
          href: '/#ve-chung-toi'
        },
        {
          id: 3,
          label: 'Liên hệ',
          href: '/#lien-he'
        }
      ]}
    />
  );

  return (
    <div className={cn(styles.errorContainer, 'columns has-margin-y-0')}>
      {RenderNavbar}
      <div className={cn(styles.container, 'column is-8 is-offset-2')}>
        <img
          className={cn(styles.img404)}
          src="/static/img/img-error-404.png"
          alt="404"
        />
        <div className={cn(styles.title)}>Không tìm thấy trang</div>
        <div className={cn(styles.desc)}>
          Xin lỗi, địa chỉ bạn truy cập không tồn tại. <br />
          Vui lòng thử lại địa chỉ khác hoặc quay về trang chủ.
        </div>

        <Button size="medium" onClick={handleGoBackToHome}>
          VỀ TRANG CHỦ
        </Button>
      </div>
    </div>
  );
};

export default ErrorDashboard;
