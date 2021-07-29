/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { Carousel } from 'react-responsive-carousel';
import { User } from '../../../hooks/useUser';
import { submitQuestionToXagoe } from '../../../services/public';
import { handleError } from '../../../utils';
import {
  XAGOE_FB_URL,
  XAGOE_YOUTUBE_URL,
  XAGOE_INSTA_URL
} from '../../../constants';

const withQuestionAgent = (Component) => (props) => {
  const [openForm, setOpenForm] = useState(false);

  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleGoNext = () => {
    carouselRef.current.moveTo(currentSlide + 1);
    setCurrentSlide((curSlide) => curSlide + 1);
  };

  const handleSubmittedFeedback = () => {
    handleGoNext();
  };

  const handleResetCarousel = () => {
    carouselRef.current.moveTo(0);
    setCurrentSlide(0);
  };

  const handleToggleAgent = () => {
    if (openForm) setOpenForm(false);
    else setOpenForm(true);

    const $container = document.querySelector(`[data-id='agent-container']`);
    const w = $container.getBoundingClientRect().width;
    const h = $container.getBoundingClientRect().height;
    $container.classList.toggle(styles.full);
    const aw = $container.getBoundingClientRect().width;
    const ah = $container.getBoundingClientRect().height;

    $container.setAttribute('style', `width: ${w}px; height: ${h}px`);

    setTimeout(() => {
      $container.setAttribute(
        'style',
        `transition: 0.4s; width: ${aw}px; height: ${ah}px`
      );
      setTimeout(() => {
        $container.setAttribute('style', '');
      }, 500);
    }, 50);

    handleResetCarousel();
  };

  return (
    <>
      <div data-id="agent-container" className={cn(styles.agentContainer)}>
        <div className={cn(styles.header)} onClick={handleToggleAgent}>
          <span className={cn(styles.headerTitle)}>Góp ý cho XAGOe</span>
          <i
            className={cn(
              styles.iconArrow,
              openForm ? 'icon-chevron-bottom' : 'icon-chevron-top'
            )}
          ></i>
        </div>

        <Carousel
          ref={carouselRef}
          style={{ background: 'white' }}
          class="carousel-container"
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          swipeable={false}
        >
          {[
            <Form key="form" onSubmitted={handleSubmittedFeedback} />,
            <ThankYou key="thankyou" />
          ]}
        </Carousel>
      </div>
      <Component {...props} />
    </>
  );
};

const Form = ({ onSubmitted }) => {
  const [value, setValue] = useState('');
  const { user } = User.useContainer();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    const { email, username } = user;

    try {
      setSubmitting(true);
      await submitQuestionToXagoe({
        email,
        name: username,
        question: value.trim()
      });

      setValue('');
      onSubmitted();
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn(styles.body)}>
      <div className={cn(styles.horizontalBar)}></div>

      <Input
        value={value}
        onValueChange={(evt) => {
          setValue(evt.target.value);
        }}
        isTextarea
        type="text"
        placeholder="Góp ý của bạn"
        className={cn(styles.textarea)}
      ></Input>
      <Button
        size="medium"
        className={cn(styles.button)}
        disabled={submitting || value.trim().length === 0}
        onClick={handleSubmitFeedback}
      >
        {submitting ? 'ĐANG GỬI...' : 'GỬI'}
      </Button>
    </div>
  );
};

const ThankYou = () => {
  const heart = (
    <svg
      width="38"
      height="34"
      viewBox="0 0 38 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.2625 1.53948C24.5266 1.01569 25.8815 0.746094 27.2499 0.746094C28.6182 0.746094 29.9732 1.01569 31.2373 1.53948C32.5014 2.06328 33.65 2.831 34.6173 3.79879C35.5849 4.76605 36.3525 5.91444 36.8762 7.17839C37.4 8.44251 37.6696 9.79745 37.6696 11.1658C37.6696 12.5342 37.4 13.8891 36.8762 15.1532C36.3524 16.4173 35.5847 17.5659 34.6169 18.5332L19.8838 33.2664C19.6493 33.5008 19.3314 33.6325 18.9999 33.6325C18.6684 33.6325 18.3504 33.5008 18.116 33.2664L3.38266 18.533C1.42875 16.5791 0.331055 13.929 0.331055 11.1658C0.331055 8.40256 1.42875 5.75249 3.38266 3.79859C5.33656 1.84468 7.98663 0.746985 10.7499 0.746985C13.5131 0.746985 16.1632 1.84468 18.1171 3.79859L18.9999 4.68137L19.8824 3.79879C19.8825 3.79873 19.8824 3.79886 19.8824 3.79879C20.8497 2.8311 21.9984 2.06324 23.2625 1.53948ZM33.7333 4.68241L32.8491 5.56615C32.1139 4.83062 31.241 4.24715 30.2803 3.84907C29.3196 3.45099 28.2898 3.24609 27.2499 3.24609C26.2099 3.24609 25.1802 3.45099 24.2194 3.84907C23.2587 4.24715 22.3858 4.83062 21.6506 5.56615L19.8838 7.33302C19.3956 7.82118 18.6041 7.82118 18.116 7.33302L16.3493 5.56635C14.8643 4.08129 12.8501 3.24698 10.7499 3.24698C8.64967 3.24698 6.63549 4.08129 5.15042 5.56635C3.66536 7.05142 2.83105 9.0656 2.83105 11.1658C2.83105 13.266 3.66536 15.2802 5.15042 16.7653L18.9999 30.6147L32.8493 16.7653C33.5848 16.0301 34.1685 15.157 34.5666 14.1962C34.9647 13.2355 35.1696 12.2057 35.1696 11.1658C35.1696 10.1259 34.9647 9.09611 34.5666 8.13537C34.1685 7.17463 33.585 6.30174 32.8495 5.56656L33.7333 4.68241Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0.331055"
          y1="17.1893"
          x2="37.6696"
          y2="17.1893"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B70F6" />
          <stop offset="1" stopColor="#8658F3" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className={cn(styles.body)}>
      <div className={cn(styles.horizontalBar)}></div>
      <div
        className={cn(
          styles.iconHeart,
          'animate__animated animate__heartBeat animate__slow animate__infinite'
        )}
      >
        {heart}
      </div>
      <p className={cn(styles.thankyou)}>
        Cám ơn về góp ý của bạn. Đội ngũ XAGOe đã nhận được thông tin và sẽ phản
        hồi bạn trong thời gian sớm nhất!
      </p>
      <p className={cn(styles.thankyou)}>Theo dõi XAGOe tại</p>

      <div className={cn(styles.iconsContainer)}>
        <a href={XAGOE_FB_URL} target="_blank" rel="noopener noreferrer">
          <img
            className={cn(styles.icon, styles.iconFb)}
            src="/static/img/icons/icon-facebook-round.svg"
            alt="fb"
          />
        </a>
        <a href={XAGOE_YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default withQuestionAgent;
