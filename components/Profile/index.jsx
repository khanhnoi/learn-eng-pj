import React, { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Avatar from '../Common/Avatar';
import SubjectTag from '../Common/SubjectTag';
import Modal from '../Common/Modal';
import moment from 'moment';
import {
  ModalUpdateUserInfo,
  ModalUpdateBio,
  ModalUpdateSchoolInfo,
  ModalUpdateSubjects,
  ModalChangePassword
} from './ModalContent';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRef } from 'react';
import Spinner from '../Common/Spinner';
import Coin from '../Common/Coin';
import {
  SUBJECT_PROPERTIES,
  DEFAULT_GRADE,
  DEFAULT_SCHOOL,
  DEFAULT_CITY,
  DEFAULT_DOB,
  DEFAULT_BIO
} from '../../constants';
import { CircularProgressbar } from 'react-circular-progressbar';

const Profile = ({ data, editable, onUpdate, onUploadFile, uploading }) => {
  const [localData, setLocalData] = useState({});
  const showSuccessToast = (message) => toast.success(message);

  useEffect(() => {
    setLocalData({
      email: data?.email,
      subjects: data?.subjects ?? [SUBJECT_PROPERTIES[0]],
      bio: data?.bio ?? DEFAULT_BIO,
      dob: data?.dob ?? DEFAULT_DOB,
      avatar: data?.avatar,
      displayName: data?.displayName,
      username: data?.username,
      city: data?.city ?? DEFAULT_CITY,
      grade: data?.grade ?? {
        id: parseInt(DEFAULT_GRADE),
        name: DEFAULT_GRADE
      },
      school: data?.school ?? DEFAULT_SCHOOL
    });
  }, [data]);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('ModalUpdateSubjects');

  const fileRef = useRef(null);
  const ProfileAvatar = (
    <div className={cn('has-text-centered', { [styles.loading]: uploading })}>
      {uploading ? (
        <span className={cn(styles.avatarContainer)}>
          <Spinner enable isLocal></Spinner>
        </span>
      ) : (
        <span className={cn(styles.avatarContainer)}>
          <Avatar
            size="large"
            url={localData?.avatar}
            displayName={localData?.displayName}
          ></Avatar>
          {editable && (
            <>
              <input
                type="file"
                id="file"
                ref={fileRef}
                onChange={(evt) => {
                  onUploadFile(evt.target.files);
                }}
                style={{ display: 'none' }}
              />
              <EditButton
                onClick={() => {
                  handleChangeUserAvatar();
                }}
              />
            </>
          )}
        </span>
      )}
    </div>
  );

  const UserInfo = (
    <div className={cn(styles.userInfoContainer)}>
      <div className={cn('is-flex has-item-center')}>
        <div
          className={cn(
            'text-is-24 has-text-weight-bold is-uppercase	is-family-secondary text-is-purple-gradient has-margin-right-3'
          )}
        >
          {localData?.displayName}
        </div>
        <div className={cn('text-is-14 has-text-weight-medium has-text-grey')}>
          @{localData?.username}
        </div>
      </div>
      <InfoItem iconName="icon-pin" label={localData?.city}></InfoItem>
      <InfoItem iconName="icon-mail" label={localData?.email}></InfoItem>
      <InfoItem
        iconName="icon-egg"
        label={moment(localData?.dob).format('Do MMMM, YYYY')}
      ></InfoItem>
    </div>
  );

  const UserBio = (
    <div className={cn()}>
      <div
        className={cn(
          'is-family-secondary has-margin-bottom-4 has-text-weight-bold text-is-20'
        )}
      >
        M?? t??? b???n th??n
      </div>
      <div className={cn('has-text-grey has-text-weight-medium text-is-14')}>
        {localData?.bio}
      </div>
    </div>
  );

  const UserLearningInfo = (
    <div className={cn(styles.learningInfoContainer)}>
      <div
        className={cn(
          'is-family-secondary has-margin-bottom-4 has-text-weight-bold text-is-20'
        )}
      >
        Th??ng tin h???c t???p
      </div>
      <div className={cn('is-flex')}>
        <div
          className={cn('is-flex has-flex-direction-column has-item-center')}
        >
          <div className={cn('text-is-18 has-text-grey has-text-weight-bold')}>
            H???c sinh l???p:
          </div>
          <div className={cn(styles.grade)}>{localData?.grade?.name}</div>
        </div>
        <div
          className={cn('is-flex has-flex-direction-column has-item-center')}
          style={{ flex: '1' }}
        >
          <div className={cn('text-is-18 has-text-grey has-text-weight-bold')}>
            Tr?????ng:
          </div>
          <div className={cn(styles.schoolContainer)}>
            <div className={cn(styles.school)}>{localData?.school}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const UserFavoriteSubject = (
    <div className={cn(styles.favoriteSubjectContainer)}>
      <div
        className={cn(
          'is-family-secondary has-margin-bottom-4 has-text-weight-bold text-is-20'
        )}
      >
        M??n h???c y??u th??ch
      </div>

      <div className={cn(styles.subjectContainer)}>
        {localData?.subjects?.map((subject) => {
          return (
            <SubjectTag
              key={subject.id}
              className={cn(styles.subject)}
              subject={subject.name}
              onSubjectClick={() => {}}
              unselectable
            ></SubjectTag>
          );
        })}
      </div>
    </div>
  );

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  const handleUpdateUserInfo = (data) => {
    onUpdate(data);
    setOpenModal(false);
  };

  const handleChangeUserAvatar = () => {
    fileRef.current.click();
  };

  const handleChangedPassword = () => {
    setOpenModal(false);
    showSuccessToast('M???t kh???u ???? ???????c thay ?????i!!');
  };

  return (
    <>
      {openModal && (
        <Modal
          onCloseModal={() => {
            setOpenModal(false);
          }}
        >
          {modalType === 'ModalUpdateUserInfo' ? (
            <ModalUpdateUserInfo
              data={{ ...localData }}
              onUpdate={handleUpdateUserInfo}
            />
          ) : modalType === 'ModalUpdateBio' ? (
            <ModalUpdateBio
              data={{ ...localData }}
              onUpdate={handleUpdateUserInfo}
            />
          ) : modalType === 'ModalUpdateSchoolInfo' ? (
            <ModalUpdateSchoolInfo
              data={{ ...localData }}
              onUpdate={handleUpdateUserInfo}
            />
          ) : modalType === 'ModalUpdateSubjects' ? (
            <ModalUpdateSubjects
              data={{ ...localData }}
              onUpdate={handleUpdateUserInfo}
            />
          ) : modalType === 'ModalChangePassword' ? (
            <ModalChangePassword onChangePassword={handleChangedPassword} />
          ) : (
            <></>
          )}
        </Modal>
      )}
      <div className={cn(styles.profileContainer)}>
        <div className="columns">
          <div className="column is-4">{ProfileAvatar}</div>
          <div className="column is-8">
            <div className={cn(styles.card)}>
              {UserInfo}
              {editable ? (
                <>
                  <EditButton
                    onClick={() => {
                      handleOpenModal('ModalUpdateUserInfo');
                    }}
                  />
                  <ChangePassword
                    onClick={() => {
                      handleOpenModal('ModalChangePassword');
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className={cn(styles.card)}>
              {UserBio}
              {editable && (
                <EditButton
                  onClick={() => {
                    handleOpenModal('ModalUpdateBio');
                  }}
                />
              )}
            </div>
          </div>
          <div className="column is-6">
            <div className={cn(styles.card)}>
              {UserLearningInfo}
              {editable && (
                <EditButton
                  onClick={() => {
                    handleOpenModal('ModalUpdateSchoolInfo');
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className={cn(styles.card)}>
              {UserFavoriteSubject}
              {editable && (
                <EditButton
                  onClick={() => {
                    handleOpenModal('ModalUpdateSubjects');
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Achievements = ({ data }) => {
  const { battleWonCount, competitionCount, competitionWonCount } = data;
  const AchieveType = ({ imgUrl, title, variant }) => {
    return (
      <div className={styles.achieveTypeContainer}>
        <div className={styles.contentContaner}>
          <img className={styles.image} src={imgUrl} alt="battle" />
          <span className={cn(styles.title, variant)}>{title}</span>
        </div>
      </div>
    );
  };

  const percentWin = competitionCount
    ? Math.floor((competitionWonCount / competitionCount) * 100)
    : 100;

  return (
    <div
      className={cn(
        'has-text-centered has-padding-top-5',
        styles.statisticContainer
      )}
    >
      <div
        className={cn('text-is-20 is-family-secondary has-text-weight-bold')}
      >
        Th???ng k?? c?? nh??n:
      </div>

      <div className="has-margin-bottom-5"></div>

      <AchieveType
        imgUrl="/static/img/icons/icon-onboard-battle.svg"
        title="S??N ?????U"
        variant="text-is-orange-gradient"
      />
      <div className="has-margin-bottom-4"></div>

      <div className={cn('has-text-grey text-is-18 has-text-weight-bold')}>
        S??? l???n ?????ng ?????u s??n ?????u:
      </div>
      <span
        className={cn(
          'text-is-orange-gradient is-family-secondary text-is-32 has-text-weight-bold'
        )}
      >
        {battleWonCount ?? 0}
      </span>

      <div className="has-margin-bottom-5"></div>

      <AchieveType
        imgUrl="/static/img/icons/icon-onboard-competition.svg"
        title="TH??CH ?????U"
        variant="text-is-purple-gradient"
      />
      <div className="has-margin-bottom-4"></div>

      <div className={cn('has-text-grey text-is-18 has-text-weight-bold')}>
        Tr???n th???ng / t???ng s???:
      </div>
      <div className="is-family-secondary">
        <span
          className={cn(
            'text-is-purple-gradient text-is-32 has-text-weight-bold'
          )}
        >
          {competitionWonCount ?? 0}
        </span>
        <span
          className="text-is-18 has-text-weight-bold"
          style={{ color: '#9a9a9a' }}
        >
          {' '}
          / {competitionCount ?? 0}
        </span>
      </div>
      <div className="has-margin-bottom-4"></div>

      <div className={cn('has-text-grey text-is-18 has-text-weight-bold')}>
        T??? l??? th???ng:
      </div>

      <div className="has-margin-bottom-3"></div>
      <div className={styles.progressRing}>
        <CircularProgressbar
          value={percentWin}
          maxValue={100}
          text={`${percentWin}%`}
          counterClockwise
          styles={{
            path: {
              stroke: '#5B70F6',
              strokeWidth: '12px',
              strokeLinecap: 'butt'
            },
            trail: {
              strokeWidth: '12px'
            },
            text: {
              // Text color
              fill: '#5B70F6',
              fontSize: '32px',
              fontWeight: 'bold',
              fontFamily: 'Roboto Condensed'
            }
          }}
        ></CircularProgressbar>
      </div>
    </div>
  );
};

export { Profile, Achievements };

const InfoItem = ({ iconName, label }) => (
  <div className={cn(styles.infoItem)}>
    <i className={iconName} />
    <span className={cn('has-text-weight-medium')}>{label}</span>
  </div>
);

const EditButton = ({ ...props }) => {
  return (
    <div className={cn(styles.edit)} {...props}>
      <i className="icon-pencil-create"></i>
    </div>
  );
};

const GiveCoinsButton = () => {
  return (
    <div className={cn(styles.giveCoins)}>
      <Coin size="normal" />
      <span className="text-is-purple-gradient has-text-weight-bold has-margin-left-4">
        T???ng Xcoin
      </span>
    </div>
  );
};

const ChangePassword = ({ ...props }) => {
  return (
    <div className={cn(styles.changePassword)} {...props}>
      <i className="icon-lock" />
      <span className="has-text-grey has-text-weight-bold">?????i m???t kh???u</span>
    </div>
  );
};
