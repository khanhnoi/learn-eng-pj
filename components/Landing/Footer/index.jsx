import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { XAGOE_TUTORIAL_URL } from '../../../constants';

const Footer = () => {
  return (
    <footer className={cn(styles.footerContainer)}>
      <span>Bản quyền © 2020 XAGOe. Giữ toàn quyền.</span>
      <Link href="/terms">
        <a href="/terms">Điều khoản</a>
      </Link>
      <Link href={XAGOE_TUTORIAL_URL}>
        <a href={XAGOE_TUTORIAL_URL}>Hướng dẫn sử dụng</a>
      </Link>
    </footer>
  );
};

export default Footer;
