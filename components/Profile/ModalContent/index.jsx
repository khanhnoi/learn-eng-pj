import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import Stepper from '../../Common/Stepper';
import SubjectTag from '../../Common/SubjectTag';
import {
  DISPLAY_NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  SUBJECT_PROPERTIES,
  MIN_GRADE,
  MAX_GRADE,
  PROVINES,
  DEFAULT_GRADE
} from '../../../constants';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import { changePassword, updateUserInfo } from '../../../services/user';
import Spinner from '../../Common/Spinner';

registerLocale('vi', vi);
setDefaultLocale('vi');

const ModalUpdateUserInfo = ({ data, onUpdate }) => {
  const [displayName, setDisplayName] = useState(data?.displayName);
  const [username, setUsername] = useState(data?.username);
  const [city, setCity] = useState(data?.city);
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    setDisplayName(data?.displayName);
    setCity(data?.city);
    setUsername(data?.username);
    setStartDate(moment(data?.dob).toDate());
  }, [data]);

  const handleSelectCity = (option) => {
    setCity(option.value);
  };

  const [userNameDuplicate, setUsernameDuplicate] = useState(false);
  const handleLocalError = (error) => {
    if (error?.response?.data?.code === 'E__INVALID_PARAMETER_ERROR') {
      setUsernameDuplicate(true);
    }
  };

  const handleUpdateInfo = async () => {
    setUsernameDuplicate(false);
    try {
      await updateUserInfo({ username });

      onUpdate({
        displayName,
        username,
        city,
        dob: startDate
      });
    } catch (error) {
      handleLocalError(error);
    }
  };

  return (
    <div className={cn('has-text-centered', styles.userInfoContainer)}>
      <div
        className={cn(
          'text-is-20 is-family-secondary has-text-weight-bold has-margin-bottom-4'
        )}
      >
        Nh???p th??ng tin c?? nh??n m???i
      </div>
      <div className={cn('has-text-weight-bold has-margin-bottom-4')}>
        <div className={cn('has-text-weight-bold has-margin-bottom-2')}>
          T??n hi???n th???:
        </div>
        <Input
          value={displayName}
          onValueChange={(evt) => {
            setDisplayName(evt.target.value);
          }}
          size="normal"
          className={cn(styles.input)}
          maxLength={DISPLAY_NAME_MAX_LENGTH}
        ></Input>
        <div
          className={cn(
            'has-text-left text-is-14 has-margin-left-4',
            styles.characters
          )}
        >
          K?? t???: {displayName?.length}/{DISPLAY_NAME_MAX_LENGTH}
        </div>
      </div>
      <div className={cn('has-text-weight-bold has-margin-bottom-4')}>
        <div className={cn('has-text-weight-bold has-margin-bottom-2')}>
          T??n t??i kho???n:
        </div>
        {userNameDuplicate && (
          <p className="has-text-danger text-is-14 has-text-weight-bold has-text-left has-margin-bottom-1">
            T??n t??i kho???n ???? ???????c ch???n b???i ng?????i ch??i kh??c
          </p>
        )}
        <Input
          isError={userNameDuplicate}
          value={username}
          onValueChange={(evt) => {
            setUsername(evt.target.value);
          }}
          size="normal"
          className={cn(styles.input)}
          maxLength={USERNAME_MAX_LENGTH}
        ></Input>

        <div
          className={cn(
            'has-text-left text-is-14 has-margin-left-4',
            styles.characters
          )}
        >
          K?? t???: {username?.length}/{USERNAME_MAX_LENGTH}
        </div>
      </div>

      <div className="has-margin-bottom-4">
        <div className={cn('has-text-weight-bold has-margin-bottom-2')}>
          Khu v???c:
        </div>
        <Dropdown
          controlClassName={styles.dropdown}
          className={styles.dropdownRoot}
          menuClassName={styles.upMenu}
          options={PROVINES}
          onChange={handleSelectCity}
          value={city}
          placeholder="Ch???n khu v???c"
        />
      </div>

      <div className="has-margin-bottom-5">
        <div className={cn('has-text-weight-bold has-margin-bottom-2')}>
          Ng??y sinh:
        </div>
        <div className="is-flex has-justify-center">
          <DatePicker
            selected={startDate}
            onChange={(startDate) => {
              setStartDate(startDate);
            }}
            locale="vi"
            timeCaption="Th???i gian"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <Button size="medium" onClick={handleUpdateInfo}>
        L??U
      </Button>
    </div>
  );
};

const ModalUpdateBio = ({ data, onUpdate }) => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    setBio(data?.bio ?? '');
  }, [data]);

  const handleUpdateInfo = () => {
    onUpdate({ bio });
  };
  return (
    <div className={cn('has-text-centered', styles.userBioContainer)}>
      <div
        className={cn(
          'text-is-20 is-family-secondary has-text-weight-bold has-margin-bottom-4'
        )}
      >
        Nh???p m?? t??? m???i
      </div>

      <div className="has-text-left has-margin-bottom-2">
        <Input
          className={styles.input}
          isTextarea
          value={bio}
          onValueChange={(evt) => {
            setBio(evt.target.value);
          }}
          maxLength={200}
        ></Input>
      </div>
      <div className={cn(styles.characters)}>K?? t???: {bio?.length}/200</div>
      <div className="has-text-left has-margin-bottom-4"></div>

      <Button size="medium" onClick={handleUpdateInfo}>
        L??U
      </Button>
    </div>
  );
};

const ModalUpdateSchoolInfo = ({ data, onUpdate }) => {
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState(parseInt(DEFAULT_GRADE));

  useEffect(() => {
    setSchool(data?.school);
    setGrade(data?.grade?.id);
  }, [data]);

  const handleUpdateInfo = () => {
    onUpdate({ school, gradeId: grade });
  };

  return (
    <div className={cn('has-text-centered', styles.userBioContainer)}>
      <div
        className={cn(
          'text-is-20 is-family-secondary has-text-weight-bold has-margin-bottom-4'
        )}
      >
        Nh???p th??ng tin h???c t???p m???i
      </div>
      <div className="has-text-weight-bold">L???p:</div>
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
      <div className="has-text-left has-margin-bottom-4"></div>
      <div className="has-text-weight-bold has-margin-bottom-3">Tr?????ng:</div>
      <Input
        value={school}
        onValueChange={(evt) => {
          setSchool(evt.target.value);
        }}
      ></Input>
      <div className="has-text-left has-margin-bottom-5"></div>

      <Button size="medium" onClick={handleUpdateInfo}>
        L??U
      </Button>
    </div>
  );
};

const ModalUpdateSubjects = ({ data, onUpdate }) => {
  const [favoriteSubjects, setFavoriteSubjects] = useState([]);

  useEffect(() => {
    setFavoriteSubjects(data?.subjects?.map((subject) => subject.name) ?? []);
  }, [data]);

  const handleUpdateInfo = () => {
    onUpdate({
      subjectIds: favoriteSubjects.map(
        (item) => SUBJECT_PROPERTIES.find((x) => x.name === item).id
      )
    });
  };

  const handleSelectSubject = (subject) => {
    if (favoriteSubjects.includes(subject)) {
      setFavoriteSubjects(favoriteSubjects.filter((item) => item !== subject));
    } else {
      setFavoriteSubjects(favoriteSubjects.concat(subject));
    }
  };

  const defaultSubjects = SUBJECT_PROPERTIES.filter((x) => x.id !== 7);

  return (
    <div className={cn('has-text-centered', styles.userUpdateSubjects)}>
      <div
        className={cn(
          'text-is-20 is-family-secondary has-text-weight-bold has-margin-bottom-4'
        )}
      >
        Ch???n m??n h???c y??u th??ch m???i
      </div>
      <div className="has-margin-bottom-5"></div>

      <div
        className={cn(
          styles.subjectContainer,
          'columns is-variable is-1 is-multiline'
        )}
      >
        {defaultSubjects.map((subject) => (
          <div className="column is-4" key={subject.id}>
            <SubjectTag
              className={cn(styles.subject)}
              subject={subject.name}
              selected={favoriteSubjects.includes(subject.name)}
              onSubjectClick={handleSelectSubject}
              variant="onboarding"
            />
          </div>
        ))}
      </div>

      <div className="has-margin-bottom-4"></div>
      <Button size="medium" onClick={handleUpdateInfo}>
        L??U
      </Button>
    </div>
  );
};

const ModalChangePassword = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [curPasswordType, setCurPasswordType] = useState('password');
  const [newPasswordType, setNewPasswordType] = useState('password');
  const [passwordError, setPasswordError] = useState({
    isError: false,
    errorMessage: ''
  });
  const [newPasswordError, setNewPasswordError] = useState({
    isError: false,
    errorMessage: ''
  });
  const [changing, setChanging] = useState(false);

  const handleError = (response) => {
    switch (response?.data?.code) {
      case 'E__INVALID_CURRENT_PASSWORD':
        setPasswordError({
          isError: true,
          errorMessage: 'M???t kh???u hi???n t???i kh??ng ????ng r???i'
        });
        break;

      case 'E__INVALID_PARAMETER':
        setPasswordError({
          isError: true,
          errorMessage: ''
        });

        setNewPasswordError({
          isError: true,
          errorMessage: 'M???t kh???u t???i thi???u 8 k?? t??? b???n nh??'
        });
        break;
      default:
        break;
    }
  };

  const handlechangePassword = async () => {
    try {
      setChanging(true);
      await changePassword({ currentPassword, newPassword });
      onChangePassword();
    } catch (error) {
      handleError(error.response);
    } finally {
      setChanging(false);
    }
  };

  const validate = () => {
    let isValid = true;

    setPasswordError({ isError: false, errorMessage: '' });
    setNewPasswordError({ isError: false, errorMessage: '' });

    if (!currentPassword) {
      setPasswordError({ isError: true, errorMessage: 'B???n ??i, miss n??y' });
      isValid = false;
    }
    if (!newPassword) {
      isValid = false;
      setNewPasswordError({ isError: true, errorMessage: 'B???n ??i, miss n??y' });
    }

    if (currentPassword.length > 0 && currentPassword.length < 8) {
      setPasswordError({
        isError: true,
        errorMessage: 'M???t kh???u t???i thi???u 8 k?? t??? b???n nh??'
      });
      isValid = false;
    }

    if (newPassword.length > 0 && newPassword.length < 8) {
      setNewPasswordError({
        isError: true,
        errorMessage: 'M???t kh???u t???i thi???u 8 k?? t??? b???n nh??'
      });
      isValid = false;
    }

    return isValid;
  };

  const handleUpdateInfo = () => {
    if (validate()) handlechangePassword();
  };

  return (
    <div className={cn('has-text-centered', styles.userChangePassword)}>
      <Spinner enable={changing} />
      <div
        className={cn(
          'text-is-20 is-family-secondary has-text-weight-bold has-margin-bottom-4'
        )}
      >
        ?????i m???t kh???u
      </div>

      <div className="has-text-weight-bold has-margin-bottom-3">
        M???t kh???u hi???n t???i:
      </div>
      <Input
        type={curPasswordType}
        value={currentPassword}
        onValueChange={(evt) => {
          setCurrentPassword(evt.target.value);
        }}
        className={cn(styles.input)}
        iconName={curPasswordType === 'password' ? 'icon-eye' : 'icon-eye-no'}
        isIconRight
        onIconClick={() => {
          setCurPasswordType(
            curPasswordType === 'password' ? 'text' : 'password'
          );
        }}
        isError={passwordError.isError}
      ></Input>
      {passwordError.isError && (
        <div className="has-text-danger has-text-left has-text-weight-semibold text-is-14 has-margin-bottom-2 has-margin-left-4">
          {passwordError.errorMessage}
        </div>
      )}

      <div className="has-margin-bottom-4"></div>
      <div className="has-text-weight-bold has-margin-bottom-3">
        M???t kh???u m???i:
      </div>
      <Input
        type={newPasswordType}
        value={newPassword}
        onValueChange={(evt) => {
          setNewPassword(evt.target.value);
        }}
        className={cn(styles.input)}
        iconName={newPasswordType === 'password' ? 'icon-eye' : 'icon-eye-no'}
        isIconRight
        onIconClick={() => {
          setNewPasswordType(
            newPasswordType === 'password' ? 'text' : 'password'
          );
        }}
        isError={newPasswordError.isError}
      ></Input>
      {newPasswordError.isError && (
        <div className="has-text-danger has-text-left has-text-weight-semibold text-is-14 has-margin-bottom-2 has-margin-left-4">
          {newPasswordError.errorMessage}
        </div>
      )}
      <div className="has-margin-bottom-5"></div>
      <Button size="medium" onClick={handleUpdateInfo}>
        ?????i m???t kh???u
      </Button>
    </div>
  );
};

export {
  ModalUpdateUserInfo,
  ModalUpdateBio,
  ModalUpdateSchoolInfo,
  ModalUpdateSubjects,
  ModalChangePassword
};
