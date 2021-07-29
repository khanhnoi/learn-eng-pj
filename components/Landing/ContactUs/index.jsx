import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { handleError } from '../../../utils';
import { submitQuestionToXagoe } from '../../../services/public';
import {
  XAGOE_FB_URL,
  XAGOE_YOUTUBE_URL,
  XAGOE_INSTA_URL
} from '../../../constants';

const ContactUs = () => {
  const smileIcon = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9999 29.6673C6.89974 29.6673 0.333252 23.1008 0.333252 15.0007C0.333252 6.90047 6.89974 0.333984 14.9999 0.333984C23.1001 0.333984 29.6666 6.90047 29.6666 15.0007C29.6666 23.1008 23.1001 29.6673 14.9999 29.6673ZM14.9999 27.0007C21.6273 27.0007 26.9999 21.6281 26.9999 15.0007C26.9999 8.37323 21.6273 3.00065 14.9999 3.00065C8.3725 3.00065 2.99992 8.37323 2.99992 15.0007C2.99992 21.6281 8.3725 27.0007 14.9999 27.0007ZM21.5473 19.5985L19.3661 18.0644C18.3723 19.4775 16.7593 20.334 14.9999 20.334C13.2406 20.334 11.6275 19.4775 10.6337 18.0644L8.45251 19.5985C9.94053 21.7142 12.3632 23.0007 14.9999 23.0007C17.6367 23.0007 20.0593 21.7142 21.5473 19.5985ZM17.6666 13.6673V11.0007H20.3333V13.6673H17.6666ZM9.66659 11.0007V13.6673H12.3333V11.0007H9.66659Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0.333252"
          y1="15.0007"
          x2="29.6666"
          y2="15.0007"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B70F6" />
          <stop offset="1" stopColor="#8658F3" />
        </linearGradient>
      </defs>
    </svg>
  );

  const helpCircleIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.00008 1.99935C4.68637 1.99935 2.00008 4.68564 2.00008 7.99935C2.00008 11.3131 4.68637 13.9993 8.00008 13.9993C11.3138 13.9993 14.0001 11.3131 14.0001 7.99935C14.0001 4.68564 11.3138 1.99935 8.00008 1.99935ZM0.666748 7.99935C0.666748 3.94926 3.94999 0.666016 8.00008 0.666016C12.0502 0.666016 15.3334 3.94926 15.3334 7.99935C15.3334 12.0494 12.0502 15.3327 8.00008 15.3327C3.94999 15.3327 0.666748 12.0494 0.666748 7.99935Z"
        fill="url(#paint0_linear)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.17199 5.34862C7.86165 5.29539 7.54247 5.35371 7.27101 5.51326C6.99954 5.6728 6.7933 5.92327 6.6888 6.22031C6.56662 6.56763 6.18601 6.75015 5.83869 6.62797C5.49136 6.50579 5.30884 6.12518 5.43103 5.77785C5.64001 5.18378 6.05249 4.68283 6.59543 4.36375C7.13836 4.04466 7.77671 3.92802 8.3974 4.03448C9.0181 4.14095 9.58108 4.46365 9.98665 4.94543C10.3921 5.42711 10.6141 6.03673 10.6132 6.66635C10.6129 7.68659 9.85654 8.36034 9.31638 8.72045C9.02596 8.91406 8.74028 9.05642 8.52984 9.14995C8.42367 9.19714 8.33427 9.23295 8.26985 9.25749C8.23758 9.26978 8.21142 9.27931 8.19238 9.28608L8.16923 9.29419L8.16185 9.2967L8.15926 9.29758L8.15823 9.29792C8.15803 9.29799 8.1574 9.2982 7.94658 8.66575L8.1574 9.2982C7.8081 9.41463 7.43056 9.22586 7.31413 8.87656C7.19777 8.5275 7.38622 8.15023 7.73507 8.03352L7.73421 8.03381C7.73428 8.03379 7.73434 8.03377 7.73507 8.03352L7.7457 8.02979C7.75596 8.02614 7.77277 8.02005 7.79519 8.0115C7.84014 7.99438 7.90699 7.96769 7.98832 7.93154C8.15288 7.8584 8.3672 7.75077 8.57678 7.61105C9.03651 7.30456 9.27991 6.9785 9.27991 6.66575L9.27992 6.66475C9.28038 6.34987 9.1694 6.04499 8.96662 5.8041C8.76383 5.56321 8.48234 5.40186 8.17199 5.34862Z"
        fill="url(#paint1_linear)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.33325 11.3327C7.33325 10.9645 7.63173 10.666 7.99992 10.666H8.00659C8.37477 10.666 8.67325 10.9645 8.67325 11.3327C8.67325 11.7009 8.37477 11.9993 8.00659 11.9993H7.99992C7.63173 11.9993 7.33325 11.7009 7.33325 11.3327Z"
        fill="url(#paint2_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0.666748"
          y1="7.99935"
          x2="15.3334"
          y2="7.99935"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5B70F6" />
          <stop offset="1" stop-color="#8658F3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="5.39307"
          y1="6.66434"
          x2="10.6133"
          y2="6.66434"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5B70F6" />
          <stop offset="1" stop-color="#8658F3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="7.33325"
          y1="11.3327"
          x2="8.67325"
          y2="11.3327"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5B70F6" />
          <stop offset="1" stop-color="#8658F3" />
        </linearGradient>
      </defs>
    </svg>
  );

  const defaultObject = {
    value: '',
    isError: false,
    errorMessage: ''
  };

  const [email, setEmail] = useState(defaultObject);
  const [name, setName] = useState(defaultObject);
  const [question, setQuestion] = useState(defaultObject);
  const [submitting, setSubmitting] = useState(false);

  const showSuccessToast = (message) => toast.success(message);

  const handleSubmitError = (error) => {
    setEmail({ ...email, isError: true });

    switch (error?.response?.data?.code) {
      case 'E_INVALID_NEW_RECORD':
        error.response.data.code = 'Địa chỉ email không hợp lệ';
        handleError(error);
        break;

      default:
        break;
    }
  };

  const submitQuestion = async () => {
    try {
      setSubmitting(true);
      await submitQuestionToXagoe({
        email: email.value.trim(),
        name: name.value.trim(),
        question: question.value.trim()
      });

      setEmail({ ...email, value: '', isError: false });
      setQuestion({ ...question, value: '', isError: false });
      setName({ ...name, value: '', isError: false });

      showSuccessToast(
        'Câu hỏi của bạn đã được gửi tới hệ thống. Chúng tôi sẽ phản hồi lại trong thời gian sớm nhất!'
      );
    } catch (error) {
      handleSubmitError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const isValidData = () => {
    let valid = true;

    setEmail({ ...email, isError: false });
    setName({ ...name, isError: false });
    setQuestion({ ...question, isError: false });

    if (!email.value) {
      setEmail({ ...email, isError: true });
      valid = false;
    }
    if (!name.value) {
      setName({ ...name, isError: true });
      valid = false;
    }
    if (!question.value) {
      setQuestion({ ...question, isError: true });
      valid = false;
    }
    return valid;
  };

  const handleSubmitQuestion = () => {
    if (isValidData()) {
      submitQuestion();
    }
  };

  const handleNavigateToDonatePage = () => {
    window.open(
      `https://give.asia/campaign/help-bring-xagoe-to-students-in-vietnam#/`,
      '_blank'
    );
  };

  return (
    <div className={cn(styles.contactUs)} id="lien-he">
      <div className={cn('columns is-variable is-6-desktop')}>
        <div className={cn('column')}>
          <span className={cn(styles.titlePurple)}>Liên hệ với chúng tôi</span>
          <Gap size="32" />
          <Link href="/">
            <a className={cn(styles.xagoeLogo)} href="/">
              <img src="/static/img/xagoe_logo.svg" alt="xagoe" />
            </a>
          </Link>
          <Link href="https://datahouse.asia/">
            <a
              className={cn(styles.dhaLogo)}
              href="https://datahouse.asia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/static/img/datahouseAsia_logo.svg" alt="dha" />
            </a>
          </Link>

          <Gap size="24" />
          <ComponentType5 iconName="icon-home">
            Đơn vị phát triển: CÔNG TY CỔ PHẦN TƯ VẤN DATAHOUSE ASIA
          </ComponentType5>
          <ComponentType5 iconName="icon-pin">
            01 Lê Đình Lý, Phường Vĩnh Trung, Quận Thanh Khê, Đà Nẵng
          </ComponentType5>
          <ComponentType5 iconName="icon-call-phone" type="tel">
            +84 (0) 777 8765 88​
          </ComponentType5>
          <ComponentType5 iconName="icon-mail" type="email">
            info@xagoe.com
          </ComponentType5>

          <div className={cn(styles.info1022)}>
            <span className={cn(styles.icon)}>{helpCircleIcon}</span>
            <span className={cn(styles.desc)}>
              Hướng dẫn sử dụng: Gọi (0236) 1022
            </span>
            <img
              className={cn(styles.image)}
              src="/static/img/icons/icon-logo-1022.svg"
              alt="1022"
            />
          </div>
          <Gap size="32" />

          <div className={cn(styles.iconsContainer)}>
            <a href={XAGOE_FB_URL} target="_blank" rel="noopener noreferrer">
              <img
                className={cn(styles.icon, styles.iconFb)}
                src="/static/img/icons/icon-facebook-round.svg"
                alt="fb"
              />
            </a>
            <a
              href={XAGOE_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={cn(styles.icon, styles.iconYoutube)}
                src="/static/img/icons/icon-youtube.svg"
                alt="youtube"
              />
            </a>
            <a href={XAGOE_INSTA_URL} target="_blank" rel="noopener noreferrer">
              <img
                className={cn(styles.icon, styles.iconInsta)}
                src="/static/img/icons/icon-instagram.svg"
                alt="insta"
              />
            </a>
          </div>
          <Gap size="32" />
          <div className={styles.needYou}>
            <span className={cn(styles.subTitlePurple)}>Chúng tôi cần bạn</span>
            {smileIcon}
          </div>

          <Button
            size="medium"
            secondary
            className={styles.donateButton}
            onClick={handleNavigateToDonatePage}
          >
            Trang gây quỹ cộng đồng của XAGOe
          </Button>
        </div>
        <div className={cn('column')}>
          <div className={cn(styles.formContainer)}>
            <div className={cn(styles.title)}>Câu hỏi cho XAGOe</div>
            <Gap size="24" />
            <Input
              isError={name.isError}
              value={name.value}
              onValueChange={(evt) => {
                setName({ ...name, value: evt.target.value });
              }}
              type="text"
              placeholder="Tên của bạn"
              className={cn(styles.input)}
            ></Input>
            <Gap size="24" />

            <Input
              isError={email.isError}
              value={email.value}
              onValueChange={(evt) => {
                setEmail({ ...email, value: evt.target.value });
              }}
              type="text"
              placeholder="Địa chỉ email của bạn"
              className={cn(styles.input)}
            ></Input>
            <Gap size="24" />

            <Input
              isError={question.isError}
              value={question.value}
              onValueChange={(evt) => {
                setQuestion({ ...question, value: evt.target.value });
              }}
              isTextarea
              type="text"
              placeholder="Câu hỏi của bạn"
              className={cn(styles.textarea)}
            ></Input>
            <Gap size="24" />
            <Button
              size="medium"
              className={cn(styles.button)}
              onClick={handleSubmitQuestion}
              // disabled={buttonDisalbed}
            >
              Gửi câu hỏi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

const ComponentType5 = ({ iconName, children, type }) => {
  const childrenType =
    type === 'email' ? (
      <a href={`mailto:${children}​`}>{children}</a>
    ) : type === 'tel' ? (
      <a href={`tel::${children}​`}>{children}</a>
    ) : (
      children
    );
  return (
    <div className={cn(styles.type5Container)}>
      <i className={iconName} />
      <span>{childrenType}</span>
    </div>
  );
};

const Gap = ({ size }) => {
  return <div style={{ marginBottom: size + 'px' }}></div>;
};
