import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '../../Common/Button';
import Slider from '../Slider';
import Router from 'next/router';
import _ from 'lodash';
import { XAGOE_TUTORIAL_URL } from '../../../constants';

const AboutXagoe = () => {
  const xagoeForItems = [
    { id: 0, label: 'Dành cho học sinh' },
    { id: 1, label: 'Dành cho giáo viên *' }
  ];
  const [xagoeForIdx, setXagoeForIdx] = useState(0);
  const handleSelectXagoeFor = (index) => {
    setXagoeForIdx(index);
  };

  useEffect(() => {
    const trackScrolling = () => {
      if (!animation1) setAnimation1(true);
    };

    document.addEventListener('scroll', _.debounce(trackScrolling, 20));
    return () => {
      document.removeEventListener('scroll', _.debounce(trackScrolling, 20));
    };
  }, []);

  const [animation1, setAnimation1] = useState(false);

  const handleWatchTutorial = () => {
    window.open(XAGOE_TUTORIAL_URL, '_blank');
  };

  return (
    <div className={cn(styles.aboutXagoe)} id="ve-xagoe">
      <span className={cn(styles.title)}>ĐẤU TRƯỜNG</span>
      <br />
      <span className={cn(styles.title)}>TRI THỨC XAGOE</span>
      <br />
      <span className={cn(styles.subTitle)}>
        Nền tảng game Thách Đấu Học Tập theo <br />
        thời gian thực đầu tiên tại Việt Nam
      </span>
      <br />
      <div className={cn(styles.buttonContainer)}>
        <Button
          size="medium"
          className={styles.joinBtn}
          onClick={() => {
            Router.push('/login');
          }}
        >
          Tham gia ngay!
        </Button>
        <Button
          size="medium"
          leftIconName="icon-player-play"
          className={styles.playBtn}
          onClick={handleWatchTutorial}
        >
          Video hướng dẫn
        </Button>
      </div>
      <div className={cn('columns is-variable is-7-desktop')}>
        <div className={cn('column', styles.type1Column)}>
          <ComponentType1
            imgUrl="/static/img/icons/icon-landing-about-1.svg"
            startAnimation={animation1}
            delay={0}
          >
            Ứng dụng công nghệ <br /> trí thông minh nhân tạo AI
          </ComponentType1>
        </div>
        <div className={cn('column', styles.type1Column)}>
          <ComponentType1
            imgUrl="/static/img/icons/icon-landing-about-2.svg"
            startAnimation={animation1}
            delay={0}
          >
            Giúp bạn giải trí, nâng cao kiến thức, kết nối bạn bè sau những giờ
            học căng thẳng
          </ComponentType1>
        </div>
        <div className={cn('column', styles.type1Column)}>
          <ComponentType1
            imgUrl="/static/img/icons/icon-landing-about-3.svg"
            startAnimation={animation1}
            delay={0}
          >
            Học tập một cách chủ động, hứng thú và hiệu quả hơn
          </ComponentType1>
        </div>
      </div>
      {/* //////////////// XAGOe dành cho ai? /////////////////// */}
      <div className={cn(styles.title2Container)}>
        <span className={cn(styles.titlePurple)}>XAGOe dành cho ai?</span>
      </div>
      <Gap size="32" />
      <Slider
        items={xagoeForItems}
        currentIndex={xagoeForIdx}
        onSelect={handleSelectXagoeFor}
        variant="purple"
        spacing="small"
      ></Slider>

      {xagoeForIdx === 0 ? (
        <>
          <div className={cn(styles.forStudentContainer, 'columns')}>
            <div className={cn('column is-half is-hidden-mobile')}>
              <div
                key="students"
                className={cn(
                  styles.forStudentImg,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/background/bg-landing-student.png"
                  alt="student"
                />
              </div>
            </div>
            <div className={cn('column is-half')}>
              <div
                className={cn(
                  styles.studentContainer,
                  'columns is-variable is-5-desktop has-margin-bottom-5-desktop'
                )}
              >
                <div className={cn('column is-half')}>
                  <ComponentType2>
                    Vừa chơi vừa rèn luyện kiến thức thông qua những thử thách
                    thú vị của XAGOe.
                  </ComponentType2>
                </div>
                <div className={cn('column is-half')}>
                  <ComponentType2>
                    ​Tạo các thử thách cá nhân, mời bạn bè tham dự và thi đấu
                    theo thời gian thực.
                  </ComponentType2>
                </div>
              </div>
              <div className={cn('columns is-variable is-5-desktop')}>
                <div className={cn('column is-half')}>
                  <ComponentType2>
                    ​Nội dung kiến thức đa dạng, thiết kế bởi đội ngũ giáo viên
                    và cố vấn dày dặn kinh nghiệm. ​
                  </ComponentType2>
                </div>
                <div className={cn('column is-half')}>
                  <ComponentType2>
                    Khẳng định trí tuệ bản thân, ghi danh trên bảng xếp hạng và
                    dành nhiều phần quà hấp dẫn.​
                  </ComponentType2>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Gap size="40" />
          <div className="has-text-centered">
            <span className="text-is-18 has-text-weight-bold text-is-orange-gradient">
              * Tính năng sắp được ra mắt trong thời gian tới
            </span>
          </div>
          <Gap size="72" />
          <div className="columns">
            <div className="column is-half">
              <div>
                <ComponentType2>
                  Giao bài tập về nhà, kiểm tra, đánh giá năng lực học sinh​.
                </ComponentType2>
              </div>
              <Gap size="32" />
              <div>
                <ComponentType2>
                  Tạo bộ câu hỏi trắc nghiệm phù hợp với nội dung bài giảng.
                </ComponentType2>
              </div>
              <Gap size="32" />
              <div>
                <ComponentType2>
                  Nâng cao hiệu quả giảng dạy, mang lại trải nghiệm học tập mới
                  cho cả giáo viên và học sinh.
                </ComponentType2>
              </div>
            </div>
            <div className="column is-half is-hidden-mobile">
              <div
                key="teacher"
                className={cn(
                  styles.forTeacherImg,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/background/bg-landing-teacher.png"
                  alt="teacher"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ComponentType1 = ({ imgUrl, children, startAnimation, delay = 0 }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (startAnimation) {
      setTimeout(() => {
        setAnimate(true);
      }, delay);
    }
  }, [startAnimation]);
  return (
    <div
      className={cn(styles.type1Container, {
        [styles.animation]: animate
      })}
    >
      <img src={imgUrl} alt="item" />
      <p>{children}</p>
    </div>
  );
};

const ComponentType2 = ({ children }) => {
  return (
    <div className={cn(styles.type2Container)}>
      <img src="/static/img/icons/icon-coin.svg" alt="coin" />
      <p>{children}</p>
    </div>
  );
};

const Gap = ({ size }) => {
  return <div style={{ marginBottom: size + 'px' }}></div>;
};

export default AboutXagoe;
