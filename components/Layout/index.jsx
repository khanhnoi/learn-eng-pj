import React, { useEffect } from 'react';
import Navbar from './Navbar';
import styles from './styles.module.scss';
import { User } from '../../hooks/useUser';
import cn from 'classnames';

const Layout = ({
  children,
  isWide,
  isOrange,
  isPublic,
  leftSidebar,
  animationOff,
  hideNavbar
}) => {
  const { user, updateUser } = User.useContainer();

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) updateUser(JSON.parse(localUser));
  }, []);

  return (
    <>
      <Navbar
        userData={user}
        isPublic={isPublic}
        animationOff={animationOff}
        hideNavbar={hideNavbar}
      ></Navbar>
      <div
        className={cn(styles.layoutContainer, {
          [styles.orange]: isOrange
        })}
      >
        <div
          className={cn(styles.animationBackground, {
            [styles.animationOff]: true
          })}
        >
          <div className={styles.block}></div>
          <div className={styles.block}></div>
          <div className={styles.block}></div>
        </div>

        <div className="container">
          <div>
            {leftSidebar}
            <main
              className={cn(
                styles.mainContainer,
                isWide && styles.wideContainer
              )}
            >
              {children}
            </main>
          </div>
        </div>

        {/* <div className={styles.overlayBackground}></div>s */}
      </div>
    </>
  );
};

export default Layout;
