import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '../../Common/Button';
import Router from 'next/router';
import _ from 'lodash';

const UserThinkXagoe = () => {
  const delta = 300;
  useEffect(() => {
    const trackScrolling = () => {
      if (animation1) return;
      const $target1 = document.getElementById('user-think-xagoe');

      if (window?.scrollY > $target1?.offsetTop - delta) {
        setAnimation1(true);
      }
    };

    document.addEventListener('scroll', _.debounce(trackScrolling, 20));
    return () => {
      document.removeEventListener('scroll', _.debounce(trackScrolling, 20));
    };
  }, []);

  const [animation1, setAnimation1] = useState(false);

  return (
    <div className={cn(styles.userThinkXagoe)} id="user-think-xagoe">
      <div className={cn(styles.titleContainer)}>
        <span className={cn(styles.titlePurple)}>
          Người dùng nghĩ gì về XAGOe
        </span>
      </div>

      <p className={cn(styles.subTitle)}>
        Chỉ ít phút rèn luyện mỗi ngày, XAGOe sẽ cùng bạn vừa giải trí vừa chinh
        phục các mục tiêu học tập​​
      </p>

      <div className={cn('columns is-variable is-8-desktop')}>
        <div className={cn('column')}>
          <ComponentType4
            imgUrl="/static/img/landingpage/user/img-student-ngochieu.png"
            from="Ngọc Hiếu, học sinh lớp 12,
            THPT Hoà Vang"
            startAnimation={animation1}
            delay={0}
          >
            “Mình cảm thấy XAGOe rất là hữu ích cho học việc học và ôn thi vì
            các câu hỏi rất hay và đúng với trọng tâm của bài kiểm tra, mình
            mong XAGOe ra mắt để ôn luyện cho kì thi đại học sắp tới”
          </ComponentType4>
        </div>
        <div className={cn('column')}>
          <ComponentType4
            imgUrl="/static/img/landingpage/user/img-student-anhhuy.png"
            from="Anh Huy, học sinh lớp 12,
            THPT Thanh Khê"
            startAnimation={animation1}
            delay={0}
          >
            “Mình cực kì ấn tượng với giao diện của XAGOe, dễ sử dụng, đơn giản,
            thú vị, mình không hề cảm thấy căng thẳng mà thoải mái như đang chơi
            game vậy”
          </ComponentType4>
        </div>
        <div className={cn('column')}>
          <ComponentType4
            imgUrl="/static/img/landingpage/user/img-student-thanhhuyen.png"
            from="Thanh Huyền, học sinh lớp 12, THPT Phan Châu Trinh"
            startAnimation={animation1}
            delay={0}
          >
            “Vừa chơi vừa rèn luyện kiến thức thông qua những thử thách là điều
            mình thích nhất ở XAGOe, rất hứng thú và hiệu quả.”
          </ComponentType4>
        </div>
      </div>
      <Gap size="24" />
      <div className={cn('has-text-centered')}>
        <Button
          size="medium"
          className={styles.joinBtn}
          onClick={() => {
            Router.push('/login');
          }}
        >
          Tham gia XAGOe ngay
        </Button>
      </div>
    </div>
  );
};

export default UserThinkXagoe;

const ComponentType4 = ({ imgUrl, children, from, startAnimation, delay }) => {
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
      className={cn(styles.type4Container, {
        [styles.animate]: animate
      })}
    >
      <div className={cn(styles.imgContainer)}>
        <img src={imgUrl} alt="avatar" />
      </div>

      <div className={cn(styles.quote)}>{children}</div>
      <div className={cn(styles.horizontalBar)}></div>
      <div className={cn(styles.from)}>{from}</div>
    </div>
  );
};

const Gap = ({ size }) => {
  return <div style={{ marginBottom: size + 'px' }}></div>;
};
