import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import Button from '../../Common/Button';
import { User } from '../../../hooks/useUser';
import { UserInfoNavbar } from '../../Layout/Navbar';

const Navbar = ({ menus, offHighLight, activeTab }) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(92);
  const [navbarIndex, setNavbarIndex] = useState(0);

  const [scrolling, setScrolling] = useState(false);
  const handleSelectNavbarItem = (index) => {
    setNavbarIndex(index);
    setScrolling(true);
    setTimeout(() => {
      setScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    if (!scrolling) {
      setNavbarIndex(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const $rootElement = document
      .querySelector('.custom-navbar-start')
      ?.getBoundingClientRect();
    const $element = document
      .querySelector('.selected-navbar-item')
      ?.getBoundingClientRect();
    setPos($element?.x - $rootElement?.x);
    setWidth($element?.width);
  }, [navbarIndex]);

  const handleNavigateLogin = () => {
    Router.push('/login');
  };

  const { user, updateUser } = User.useContainer();
  const [isAuthen, setIsAuthen] = useState(false);
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      updateUser(JSON.parse(localUser));
      setIsAuthen(true);
    }
  }, []);

  const handleBackToBattle = () => {
    Router.push('/battle');
  };

  const logoLink = isAuthen ? '/battle' : '/';

  return (
    <nav
      className={cn(styles.navbar, 'navbar is-fixed-top')}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link href={logoLink}>
            <a className="navbar-item" href={logoLink}>
              <img
                src="/static/img/xagoe_logo.svg"
                width="100"
                height="32"
                alt="logo"
              />
            </a>
          </Link>
          <a
            role="button"
            className={cn('navbar-burger burger', {
              'is-active': toggleNavbar === true
            })}
            aria-label="menu"
            aria-expanded="false"
            data-target="xagoeNavbar"
            onClick={() => setToggleNavbar(!toggleNavbar)}
            onKeyDown={() => setToggleNavbar(!toggleNavbar)}
            tabIndex={0}
            href="#xagoeNavbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="xagoeNavbar"
          className={cn('navbar-menu', { 'is-active': toggleNavbar === true })}
        >
          <div
            className={cn(
              'navbar-start',
              styles.customMenubar,
              'custom-navbar-start'
            )}
          >
            {menus?.map((item) => (
              <Link key={item.id} href={`${item.href}`}>
                <a
                  href={`${item.href}`}
                  className={cn('navbar-item', styles.customLink, {
                    [styles.selected]: !offHighLight && navbarIndex === item.id,
                    'selected-navbar-item': navbarIndex === item.id
                  })}
                  onClick={() => {
                    handleSelectNavbarItem(item.id);
                  }}
                  onKeyPress={() => {
                    handleSelectNavbarItem(item.id);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            {isAuthen && (
              <Button
                size="small"
                secondary
                rightIconName="icon-arrow-bold-right"
                containerClassName={cn(styles.buttonContainer)}
                className={cn(styles.backToBattle)}
                onClick={handleBackToBattle}
              >
                Quay lại ĐẤU TRƯỜNG
              </Button>
            )}
            {!offHighLight && (
              <div
                className={cn(styles.activeItem)}
                style={{ left: `${pos}px`, width }}
              ></div>
            )}
          </div>

          {isAuthen ? (
            <UserInfoNavbar userData={user} />
          ) : (
            <div className={cn('navbar-end', styles.navbarEnd)}>
              <Link href="/signup">
                <a
                  href="/signup"
                  className="text-is-purple-gradient has-text-weight-bold is-family-secondary has-margin-right-4"
                >
                  Tạo tài khoản
                </a>
              </Link>
              <Button
                size="small"
                style={{ padding: '0 24px' }}
                onClick={handleNavigateLogin}
              >
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
