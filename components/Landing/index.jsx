/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Navbar from './LandingNavbar';
import AboutXagoe from './AboutXagoe';
import Features from './XagoeFeatures';
import UserThinkXagoe from './UserThinkXagoe';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Footer from './Footer';
import _ from 'lodash';

const Landing = () => {
  const menus = [
    {
      id: 0,
      label: 'Về XAGOe',
      href: '#ve-xagoe'
    },
    {
      id: 1,
      label: 'Tính năng',
      href: '#tinh-nang'
    },
    {
      id: 2,
      label: 'Về chúng tôi',
      href: '#ve-chung-toi'
    },
    {
      id: 3,
      label: 'Liên hệ',
      href: '#lien-he'
    }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const delta = 100;
  useEffect(() => {
    const trackScrolling = () => {
      const $target2 = document.getElementById('tinh-nang');
      const $target3 = document.getElementById('ve-chung-toi');
      const $target4 = document.getElementById('lien-he');

      if (
        window?.scrollY > $target4?.offsetTop - delta ||
        window?.innerHeight + window?.scrollY >=
          document?.body?.scrollHeight - delta
      ) {
        setActiveTab(3);
      } else if (window?.scrollY > $target3?.offsetTop - delta) {
        setActiveTab(2);
      } else if (window?.scrollY > $target2?.offsetTop - delta) {
        setActiveTab(1);
      } else {
        setActiveTab(0);
      }
    };

    document.addEventListener('scroll', _.debounce(trackScrolling, 50));
    return () => {
      document.removeEventListener('scroll', _.debounce(trackScrolling, 50));
    };
  }, []);

  return (
    <div className={cn(styles.landingContainer)}>
      <Navbar menus={menus} activeTab={activeTab} />
      <div className={cn(styles.colorBurnBackground)}></div>
      <div className={cn('container', styles.container)}>
        <div className={cn(styles.firstBackground)}></div>
        <AboutXagoe />
        <Features />
        <UserThinkXagoe />
        <AboutUs />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
