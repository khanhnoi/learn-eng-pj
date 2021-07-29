import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Slider from '../Slider';
import {
  DANANG_ICT_URL,
  MADEINDANANG_URL,
  BAODANANG_URL,
  DANANG_1022_URL
} from '../../../constants';

const AboutUs = () => {
  const aboutUsItems = [
    { id: 0, label: 'Đội ngũ XAGOe' },
    { id: 1, label: 'Đội ngũ cố vấn' },
    { id: 2, label: 'Đối tác' }
  ];
  const [aboutUsIdx, setAboutUsIdx] = useState(0);
  const handleSelectAboutUsItem = (index) => {
    setAboutUsIdx(index);
  };

  const xagoeTeam = [
    {
      id: 1,
      name: 'Huy Nguyễn',
      title: 'Người sáng lập',
      imgUrl: '/static/img/landingpage/user/img-huy-nguyen.png'
    },
    {
      id: 2,
      name: 'Thuý Đinh',
      title: 'Chuyên viên truyền thông',
      imgUrl: '/static/img/landingpage/user/img-thuy-dinh.png'
    },
    {
      id: 3,
      name: 'Trình Đặng',
      title: 'Kiến trúc sư phần mềm',
      imgUrl: '/static/img/landingpage/user/img-trinh-dang.png'
    },
    {
      id: 4,
      name: 'Thảo Thái',
      title: 'Chuyên viên truyền thông',
      imgUrl: '/static/img/landingpage/user/img-thao-thai.png'
    },
    {
      id: 5,
      name: 'Kỳ Phạm',
      title: 'Quản lý dự án',
      imgUrl: '/static/img/landingpage/user/img-ky-pham.png'
    },
    {
      id: 6,
      name: 'Diệp Nguyễn',
      title: 'Chuyên viên truyền thông',
      imgUrl: '/static/img/landingpage/user/img-diep-nguyen.png'
    },
    {
      id: 7,
      name: 'Phúc Bùi',
      title: 'Lập trình viên',

      imgUrl: '/static/img/landingpage/user/img-phuc-bui.png'
    },
    {
      id: 8,
      name: 'Chung Thân',
      title: 'Chuyên viên kiểm tra chất lượng',
      imgUrl: '/static/img/landingpage/user/img-chung-than.png'
    },
    {
      id: 9,
      name: 'Lộc Trần',
      title: 'Lập trình viên',
      imgUrl: '/static/img/landingpage/user/img-loc-tran.png'
    },
    {
      id: 10,
      name: 'Hằng Trần',
      title: 'Chuyên viên kiểm tra chất lượng',
      imgUrl: '/static/img/landingpage/user/img-hang-tran.png'
    },
    {
      id: 11,
      name: 'Quý Hồ',
      title: 'Lập trình viên',
      imgUrl: '/static/img/landingpage/user/img-quy-ho.png'
    },
    {
      id: 12,
      name: 'Thảo Nguyễn',
      title: 'Chuyên viên thiết kế',
      imgUrl: '/static/img/landingpage/user/img-thao-nguyen.png'
    },
    {
      id: 13,
      name: 'Khánh Nguyễn',
      title: 'Kỹ sư vận hành và phát triển',
      imgUrl: '/static/img/landingpage/user/img-khanh-nguyen.png'
    },
    {
      id: 14,
      name: 'Hương Hồ',
      title: 'Chuyên viên thiết kế',
      imgUrl: '/static/img/landingpage/user/img-huong-ho.png'
    }
  ];

  const xagoeAdvisors = [
    {
      id: 1,
      name: 'R. Lidman',
      title: 'Cố vấn công nghệ giáo dục',
      imgUrl: '/static/img/landingpage/user/img-rufus.png'
    },
    {
      id: 2,
      name: 'GheeHoe Cheng',
      title: 'Cố vấn chiến lược',
      imgUrl: '/static/img/landingpage/user/img-cheng.png'
    },
    {
      id: 3,
      name: 'Vinh Trần',
      title: 'Giáo viên trường trung học phổ thông',
      imgUrl: '/static/img/landingpage/user/img-vinh-tran.png'
    },
    {
      id: 4,
      name: 'Nhi Trần',
      title: 'Đại sứ',
      imgUrl: '/static/img/landingpage/user/img-nhi-tran.png'
    },
    {
      id: 5,
      name: 'Hải Đoàn',
      title: 'Cố vấn',
      imgUrl: '/static/img/landingpage/user/img-hai-doan.png'
    }
  ];

  const strike = (
    <svg
      width="190"
      height="1"
      viewBox="0 0 190 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="190"
        y1="0.25"
        x2="-2.18557e-08"
        y2="0.249983"
        stroke="#9A9A9A"
        strokeWidth="0.5"
      />
    </svg>
  );

  return (
    <div className={cn(styles.aboutUs)} id="ve-chung-toi">
      <div className={cn(styles.titleContainer)}>
        <span className={cn(styles.titlePurple)}>Về chúng tôi</span>
      </div>
      <p className={cn(styles.subTitle)}>
        Mục tiêu của chúng tôi là mang lại những tác động tích cực cho thế hệ
        tương lai của Việt Nam, bằng cách thúc đẩy học sinh Việt Nam có thêm
        động lực trong học tập với nền tảng XAGOe Đấu Trường Tri Thức. Việc học
        sẽ không còn căng thăng mà trở nên vui vẻ và thú vị hơn!
      </p>
      <Slider
        items={aboutUsItems}
        currentIndex={aboutUsIdx}
        onSelect={handleSelectAboutUsItem}
        variant="purple"
        spacing="medium"
      ></Slider>
      <Gap size="24" />

      {aboutUsIdx === 0 ? (
        <div
          key="xagoe-team"
          className={cn('animate__animated animate__fadeIn')}
        >
          <p className={cn(styles.desc1)}>
            Với những kỹ sư dày dặn kinh nghiệm về thiết kế và phát triển phần
            mềm, chúng tôi mong muốn đóng góp cho một Việt Nam tốt đẹp hơn.
          </p>
          <Gap size="20" />
          <div className={cn(styles.userContainer)}>
            {xagoeTeam.map((item) => (
              <UserComponent
                key={item.id}
                imgUrl={item.imgUrl}
                name={item.name}
                title={item.title}
              />
            ))}
          </div>
        </div>
      ) : aboutUsIdx === 1 ? (
        <div key="advisor" className={cn('animate__animated animate__fadeIn')}>
          <p className={cn(styles.desc2)}>
            Với những chuyên gia và giáo viên dày dặn kiến thức và kinh nghiệm
            trong ngành công nghệ phần mềm và giáo dục đào tạo, ban cố vấn của
            XAGOe mang đến những khuyến nghị chiến lược cũng như những tư vấn
            phù hợp nhất cho sự phát triển của XAGOe.
          </p>
          <Gap size="20" />
          <div className={cn(styles.userContainer)}>
            {xagoeAdvisors.map((item) => (
              <UserComponent
                key={item.id}
                imgUrl={item.imgUrl}
                name={item.name}
                title={item.title}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          key="partner"
          className={cn(
            styles.partnerContainer,
            'animate__animated animate__fadeIn'
          )}
        >
          <div className={cn(styles.partnerType)}>
            {strike}
            <span>Đơn vị bảo trợ truyền thông</span>
            {strike}
          </div>
          <div className={cn(styles.ictGuaranteePartner)}>
            <a href={DANANG_ICT_URL} target="_blank" rel="noopener noreferrer">
              <img
                className={cn(styles.ict)}
                src="/static/img/rewards/img-partner-ict.png"
                alt="ict"
              />
            </a>
            <a href={DANANG_1022_URL} target="_blank" rel="noopener noreferrer">
              <img
                className={cn(styles.ict)}
                src="/static/img/rewards/img-partner-1022.png"
                alt="1022"
              />
            </a>
          </div>
          <div className={cn(styles.partnerType)}>
            {strike}
            <span>Đối tác dịch vụ</span>
            {strike}
          </div>
          <div className={cn(styles.serivesPartner)}>
            <img
              className={cn(styles.sharetea)}
              src="/static/img/rewards/img-partner-sharetea.png"
              alt="sharetea"
            />
            <img
              className={cn(styles.cupscoffee)}
              src="/static/img/rewards/img-partner-cupscoffee.png"
              alt="cupscoffee"
            />
            <img
              className={cn(styles.joy)}
              src="/static/img/rewards/img-partner-joy.png"
              alt="joy"
            />
          </div>
          <div className={cn(styles.partnerType)}>
            {strike}
            <span>Đối tác truyền thông</span>
            {strike}
          </div>
          <div className={cn(styles.communicatePartner)}>
            <a
              href={MADEINDANANG_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={cn(styles.madeindanang)}
                src="/static/img/rewards/img-partner-madeindanang.png"
                alt="madeindanang"
              />
            </a>
            <a href={BAODANANG_URL} target="_blank" rel="noopener noreferrer">
              <img
                className={cn(styles.danangPaper)}
                src="/static/img/rewards/img-partner-baodanang.png"
                alt="baodanang"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;

const Gap = ({ size }) => {
  return <div style={{ marginBottom: size + 'px' }}></div>;
};

const UserComponent = ({ imgUrl, name, title }) => {
  return (
    <div className={cn(styles.userComponentContainer)}>
      <div className={cn(styles.image)}>
        <img src={imgUrl} alt="avatar" />
      </div>
      <div className={cn(styles.name)}>{name}</div>
      <div className={cn(styles.title)}>{title}</div>
    </div>
  );
};
