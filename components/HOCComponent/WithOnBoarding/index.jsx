/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../Common/Modal';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '../../Common/Button';
import Dropdown from 'react-dropdown';
import Layout from '../../Layout';
import Stepper from '../../Common/Stepper';
import Input from '../../Common/Input';
import SubjectTag from '../../Common/SubjectTag';
import { User } from '../../../hooks/useUser';
import {
  PROVINES,
  SUBJECT_PROPERTIES,
  MIN_GRADE,
  MAX_GRADE,
  DEFAULT_GRADE
} from '../../../constants';
import { Carousel } from 'react-responsive-carousel';
import { updateUserInfo, getUser } from '../../../services/user';

const withOnBoarding = (Component) => (props) => {
  const { user, updateUser } = User.useContainer();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleGoNext = () => {
    carouselRef.current.moveTo(currentSlide + 1);
    setCurrentSlide((curSlide) => curSlide + 1);
  };

  const handleNavigateSlide = (indexSlide) => {
    if (indexSlide > currentSlide) return;
    carouselRef.current.moveTo(indexSlide);
    setCurrentSlide(indexSlide);
  };

  const [usernameError, setUsernameError] = useState(false);
  const handleUpdateAndGoNext = async (params) => {
    try {
      setUsernameError(false);
      await handleUpdateUser(params);
      handleGoNext();
    } catch (error) {
      // handleError(error);
      setUsernameError(true);
    }
  };

  const handleUpdateUser = async (params) => {
    try {
      const res = await updateUserInfo(params);
      updateUser(res.data);
    } catch (error) {
      throw error;
    }
  };

  const handleFinish = (params) => {
    handleUpdateUser(params);
    handleCloseModal(true);
  };

  const handleCloseModal = async () => {
    const res = await getUser();
    localStorage.setItem('user', JSON.stringify(res.data));
    setCloseModal(true);
  };

  useEffect(() => {
    if (!user.lastLogin && !closeModal) setOpenModal(true);
    setLoading(false);
  }, [user]);

  const Slider = ({ currentStep, totalStep, onClick }) => {
    return (
      <div className={styles.sliderContainer}>
        {[...Array(totalStep).keys()].map((item, index) => (
          <span
            onClick={() => {
              onClick(index);
            }}
            key={item}
            className={cn({
              [styles.selected]: currentStep === index,
              [styles.active]: currentStep > index
            })}
          ></span>
        ))}
      </div>
    );
  };

  if (loading) return <></>;
  if (openModal)
    return (
      <Layout isOrange>
        <Modal
          onCloseModal={() => {
            setOpenModal(false);
          }}
          notAllowClose
          closeModal={closeModal}
          contentClassName={styles.modalContentOnboarding}
        >
          <div className={cn(styles.onboardingContainer)}>
            <Slider
              currentStep={currentSlide}
              totalStep={3}
              onClick={handleNavigateSlide}
            />
            <div className="has-margin-bottom-5"></div>
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
                <WelcomeOnboarding
                  key="WelcomeOnboarding"
                  onNext={handleGoNext}
                  onClose={handleCloseModal}
                  user={user}
                />,
                <UserInfoOnboarding
                  key="UserInfoOnboarding"
                  onNext={handleUpdateAndGoNext}
                  onClose={handleCloseModal}
                  usernameError={usernameError}
                />,
                <SchoolInfoOnboarding
                  key="SchoolInfoOnboarding"
                  onNext={handleFinish}
                  onClose={handleCloseModal}
                />
              ]}
            </Carousel>
          </div>
        </Modal>
      </Layout>
    );

  return <Component {...props} />;
};

const WelcomeOnboarding = ({ onNext, onClose, user }) => {
  const OnBoardItem = ({ imgUrl, title, children }) => {
    return (
      <div className={cn(styles.onboardingItem)}>
        <img className={styles.image} src={imgUrl} alt={title} />
        <p className={styles.title}>{title}</p>
        <p className={styles.desc}>{children}</p>
      </div>
    );
  };

  return (
    <div className={cn('has-text-centered')}>
      <div
        className={cn('text-is-24 has-text-weight-bold has-margin-bottom-4')}
      >
        <span className="text-is-purple-gradient">
          Chào mừng {user.displayName} đến với XAGOe! :)
        </span>
      </div>

      <div
        className={cn('text-is-24 has-text-weight-bold has-margin-bottom-4')}
      >
        Điều gì đang đợi bạn khám phá?
      </div>
      <div className={cn(styles.onboardingItemContainer)}>
        <OnBoardItem
          title="Sàn đấu"
          imgUrl="/static/img/icons/icon-onboard-battle.svg"
        >
          Phá đảo sàn đấu <br />
          ghi danh bảng vàng
        </OnBoardItem>
        <OnBoardItem
          title="Thách đấu"
          imgUrl="/static/img/icons/icon-onboard-competition.svg"
        >
          Đấu trí cùng bạn bè <br />
          xem ai "đỉnh" hơn
        </OnBoardItem>
        <OnBoardItem
          title="Thử thách"
          imgUrl="/static/img/icons/icon-onboard-challenge.svg"
        >
          Chinh phục thử thách <br />
          mở lối tương lai
        </OnBoardItem>
      </div>

      <Button size="medium" onClick={onNext} style={{ padding: '0 40px' }}>
        TIẾP TỤC
      </Button>
      <div className="has-margin-bottom-4"></div>
    </div>
  );
};

const UserInfoOnboarding = ({ onNext, onClose, usernameError }) => {
  const [city, setCity] = useState('Đà Nẵng');
  const [username, setUsername] = useState('');

  const handleSelectCity = (option) => {
    setCity(option.value);
  };

  const InputHelper = ({ children }) => {
    return (
      <div className={styles.inputHelperContainer}>
        <i className="icon-info"></i>
        <p>{children}</p>
      </div>
    );
  };

  const handleGoNext = () => {
    let params = { city };
    if (username) params = { ...params, username };
    onNext(params);
  };

  return (
    <div className={cn('has-text-centered', styles.userInfoContainer)}>
      <div className={cn('text-is-24 has-text-weight-bold', styles.title)}>
        Làm sao để tìm bạn dễ dàng hơn?
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Bạn đang ở đâu thế?</div>
        <Dropdown
          controlClassName={styles.dropdown}
          className={styles.dropdownRoot}
          menuClassName={styles.upMenu}
          options={PROVINES}
          onChange={handleSelectCity}
          value={city}
          placeholder="Chọn thành phố"
        />

        <InputHelper>
          XAGOe sẽ đưa ra một số gợi ý bạn bè ở xung quanh khu vực lân cận nè!
        </InputHelper>
        <div className="has-margin-bottom-5"></div>

        <div className={styles.inputLabel}>Tên tài khoản:</div>
        <Input
          value={username}
          onValueChange={(evt) => {
            setUsername(evt.target.value);
          }}
          placeholder="Tên tài khoản"
          maxLength="23"
          isError={usernameError}
        ></Input>
        {usernameError && (
          <p className="has-text-danger text-is-14 has-text-weight-bold has-text-left has-padding-left-4">
            Tên tài khoản đã được chọn bởi người chơi khác
          </p>
        )}
        <InputHelper>
          Tạo tên tài khoản thật ngầu để bạn bè dễ dàng tìm kiếm bạn nhé.
        </InputHelper>
      </div>

      <div className="has-margin-bottom-6"></div>

      <Button
        size="medium"
        onClick={handleGoNext}
        style={{ padding: '0 40px' }}
      >
        TIẾP TỤC
      </Button>
      <div className="has-margin-bottom-4"></div>
    </div>
  );
};

const SchoolInfoOnboarding = ({ onNext, onClose }) => {
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState(parseInt(DEFAULT_GRADE));
  const defaultSubjects = SUBJECT_PROPERTIES.filter((x) => x.id !== 7);
  const [subjects, setSubjects] = useState([]);
  const onSubjectClick = (subject) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((item) => item !== subject));
    } else {
      setSubjects(subjects.concat(subject));
    }
  };

  const InputHelper = ({ children }) => {
    return (
      <div
        className={styles.inputHelperContainer}
        style={{ justifyContent: 'center' }}
      >
        <i className="icon-info"></i>
        <p>{children}</p>
      </div>
    );
  };

  const handleGoNext = () => {
    let params = {
      gradeId: grade,
      school,
      subjectIds: subjects.map(
        (item) => SUBJECT_PROPERTIES.find((x) => x.name === item).id
      )
    };
    onNext(params);
  };

  return (
    <div className={cn('has-text-centered', styles.schoolInfoContainer)}>
      <div className={cn('text-is-24 has-text-weight-bold', styles.title)}>
        Cách để tìm những trận đấu phù hợp với bạn?
      </div>

      <InputHelper>
        Thông tin trường, lớp sẽ giúp XAGOe đưa ra những trận đấu, đối thủ phù
        hợp nhất với bạn.
      </InputHelper>
      <div className="has-margin-bottom-5"></div>

      <div className={styles.inputContainer}>
        <div className="columns is-variable is-6">
          <div className="column">
            <div className={styles.inputLabel}>Học sinh lớp:</div>
            <Stepper
              type="grade"
              min={MIN_GRADE}
              max={MAX_GRADE}
              step={1}
              onChange={(grade) => {
                setGrade(grade);
              }}
              value={grade}
            ></Stepper>
            <div className="has-margin-bottom-5"></div>

            <div className={styles.inputLabel}>Trường:</div>

            <Input
              value={school}
              onValueChange={(evt) => {
                setSchool(evt.target.value);
              }}
              placeholder="Trường"
            ></Input>
          </div>
          <div className="column">
            <div className={styles.inputLabel}>Môn học yêu thích:</div>
            <div className="has-margin-bottom-5"></div>
            <div className="columns is-multiline ">
              {defaultSubjects.map((x) => {
                return (
                  <div
                    className="column is-4 has-text-centered"
                    key={`subtag${x.id}`}
                  >
                    <SubjectTag
                      onSubjectClick={onSubjectClick}
                      subject={x.name}
                      selected={subjects.includes(x.name)}
                      variant="onboarding"
                    ></SubjectTag>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="has-margin-bottom-6"></div>

      <Button
        size="medium"
        onClick={handleGoNext}
        style={{ padding: '0 40px' }}
      >
        HOÀN THÀNH
      </Button>
      <div className="has-margin-bottom-4"></div>
    </div>
  );
};

export default withOnBoarding;
