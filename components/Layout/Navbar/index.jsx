import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import styles from './styles.module.scss';
import Router, { useRouter } from 'next/router';
import firebase from '../../../services/firebase';
import OutsideClickHandler from 'react-outside-click-handler';
import CoinsFrame from '../../Common/CoinsFrame';
import Avatar from '../../Common/Avatar';
// import { useCountUp } from 'react-countup';
import { handleError } from '../../../utils';
import { User } from '../../../hooks/useUser';
import { Competition } from '../../../hooks/useCompetition';
import { Notification } from '../../../hooks/useNotification';
import { logout } from '../../../services/auth';
import { getUser } from '../../../services/user';
import {
  PUBLIC_MENU,
  MAX_NOTIFICATIONS_SHOW,
  MAX_NOTIFICATIONS_KEEP
} from '../../../constants';
import { getMyCompetitions } from '../../../services/competition';
import moment from 'moment';

const Navbar = ({ userData, isPublic, animationOff, hideNavbar }) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const mainMenu = [
    { id: 101, href: '/battle', label: 'Sàn đấu', notificationCount: 0 },
    { id: 102, href: '/competition', label: 'Thách đấu', notificationCount: 0 },
    { id: 103, href: '/challenge', label: 'Thử thách', notificationCount: 0 },
    { id: 104, href: '/rewards', label: 'Phần thưởng', notificationCount: 0 },
    { id: 105, href: '/landing', label: 'Về XAGOe', notificationCount: 0 }
  ];

  const { competitions, updateCompetitions } = Competition.useContainer();

  const getCompetitions = async () => {
    try {
      const competitions = (
        await getMyCompetitions({
          'participant-status': 'pending'
        })
      ).data.map((x) => {
        return {
          ...x,
          userId: x.creatorId,
          competition: {
            ...x,
            level: x.level.name,
            subject: x.subject.name,
            grade: x.grade.name,
            createdById: x.creatorId,
            participants: x.participants.map((p) => ({
              ...p,
              isCreator: p.userId === x.creatorId
            }))
          }
        };
      });

      updateCompetitions(competitions);
    } catch (error) {
      handleError(error);
    }
  };

  const subscribeCompetitionUpdate = (userId) => {
    const userRef = firebase.database().ref(`users/${userId}/cu`);
    userRef.on('value', (snapshot) => {
      getCompetitions();
    });
  };

  useEffect(() => {
    if (userData.id && !isPublic) {
      subscribeCompetitionUpdate(userData.id);
    }
  }, [userData.id]);

  const newMenu = mainMenu.map((menu) => {
    if (menu.id === 102) {
      const newItem = Object.assign({}, menu, {
        notificationCount: competitions.length
      });
      return newItem;
    } else {
      return menu;
    }
  });

  const mainMenuCmp = (isPublic ? PUBLIC_MENU : newMenu).map((item) => (
    <CustomLink href={item.href} key={item.id}>
      <a
        className={cn(
          'navbar-item text-is-14 has-text-weight-medium',
          styles.customLink,
          { [styles.animationOff]: animationOff }
        )}
        href={item.href}
      >
        {item.label}

        {item.notificationCount ? (
          <span className={styles.notification}>{item.notificationCount}</span>
        ) : (
          <></>
        )}
      </a>
    </CustomLink>
  ));

  const logoLink = isPublic ? '/' : '/battle';

  return (
    <nav
      className={cn(styles.navbar, 'navbar is-fixed-top')}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link href={logoLink}>
            <a className="navbar-item" href={logoLink}>
              <img
                src="/static/img/xagoe_logo.svg"
                width="100"
                height="32"
                alt="logo"
              />
            </a>
          </Link>
          <a
            role="button"
            className={cn('navbar-burger burger', {
              'is-active': toggleNavbar === true
            })}
            aria-label="menu"
            aria-expanded="false"
            data-target="xagoeNavbar"
            onClick={() => setToggleNavbar(!toggleNavbar)}
            onKeyDown={() => setToggleNavbar(!toggleNavbar)}
            tabIndex={0}
            href="#xagoeNavbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        {!hideNavbar && (
          <div
            id="xagoeNavbar"
            className={cn('navbar-menu', {
              'is-active': toggleNavbar === true
            })}
          >
            <div className={cn('navbar-start', styles.customMenubar)}>
              <div>{mainMenuCmp}</div>
            </div>

            {!isPublic && <UserInfoNavbar userData={userData} />}
          </div>
        )}
      </div>
    </nav>
  );
};

export const UserInfoNavbar = ({ userData }) => {
  const { updateUser } = User.useContainer();
  const queryUserData = async () => {
    try {
      const res = await getUser();
      localStorage.setItem('user', JSON.stringify(res.data));
      // rerender
      updateUser(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const subscribeUpdateCoin = async () => {
    const userRef = firebase.database().ref(`users/${userData.id}/c`);
    userRef.on('value', (snapshot) => {
      queryUserData();
    });
  };

  const handleShortenNotificationList = (userId, notificationList) => {
    const removeList = notificationList.slice(MAX_NOTIFICATIONS_KEEP);
    removeList.map((item) => {
      removeNotificationFromFirebase(userId, item.id);
    });
  };

  const handleProcessData = (userId, rawData) => {
    if (!rawData) return;
    const formattedData = Object.keys(rawData)
      .map((x) => ({
        id: x,
        time: rawData[x].d,
        title: rawData[x].t,
        isRead: rawData[x].ir,
        action: rawData[x].a,
        icon: rawData[x].i
      }))
      .sort((a, b) => new Date(b.time) - new Date(a.time));

    if (formattedData.length > MAX_NOTIFICATIONS_SHOW) {
      handleShortenNotificationList(userId, formattedData);
    } else {
      updateNotifications(formattedData);
    }
  };

  const {
    notifications,
    updateNotifications,
    markNotificationAsRead,
    removeNotificationFromFirebase
  } = Notification.useContainer();
  const subscribeNotification = (userId) => {
    const userRef = firebase.database().ref(`users/${userId}/n`);
    userRef.on(
      'value',
      (snapshot) => {
        try {
          handleProcessData(userId, snapshot.val());
        } catch (err) {
          console.log(err);
        }
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    if (userData.id) {
      subscribeUpdateCoin();
      subscribeNotification(userData.id);
    }
  }, [userData.id]);

  const handleNavigateProfile = () => {
    Router.push('/profile/me');
  };

  const handleMarkItemAsRead = (notificationId) => {
    markNotificationAsRead(userData.id, notificationId);
  };

  const handleMarkAllAsRead = () => {
    notifications.map((item) => {
      if (!item.isRead) {
        markNotificationAsRead(userData.id, item.id);
      }
    });
  };

  const handleLogout = () => {
    logout();
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleOpenDropdown = () => {
    if (!!dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div
      className={cn('navbar-end has-item-center', styles.navbarEnd)}
      style={{ alignItems: 'center' }}
    >
      <CoinsFrame badge={userData?.totalCoin} className="has-margin-right-24" />

      <NotificationComponent
        onItemClick={handleMarkItemAsRead}
        onMarkAll={handleMarkAllAsRead}
        data={notifications}
        userData={userData}
        style={{ marginRight: '28px' }}
      />

      <div className={cn(styles.avatarContainer, 'has-margin-right-5')}>
        <OutsideClickHandler onOutsideClick={handleCloseDropdown}>
          <Avatar
            url={userData?.avatar}
            className={styles.avatar}
            displayName={userData?.displayName}
            size="normal"
            onClick={handleOpenDropdown}
          ></Avatar>
          <span
            className={cn(styles.dropdownArrow, {
              [styles.arrorUp]: dropdownOpen
            })}
            onClick={handleOpenDropdown}
            onKeyPress={handleOpenDropdown}
            tabIndex={0}
            role="button"
          ></span>
          {dropdownOpen && (
            <div className={cn(styles.dropdownContainer)}>
              <div className={cn(styles.dropdownItem)}>
                <img src="/static/img/icons/icon-user.svg" alt="user" />
                <span
                  className="has-margin-left-4"
                  onClick={handleNavigateProfile}
                  onKeyPress={handleNavigateProfile}
                  tabIndex={0}
                  role="button"
                >
                  Trang cá nhân
                </span>
              </div>
              <div className={cn(styles.dropdownItem)}>
                <img src="/static/img/icons/icon-logout.svg" alt="logout" />
                <span
                  className="has-margin-left-4"
                  onClick={handleLogout}
                  onKeyPress={handleLogout}
                  tabIndex={0}
                  role="button"
                >
                  Đăng xuất
                </span>
              </div>
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

const CustomLink = ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || '';

  // href is not /
  if (href.substr(1) && router.pathname.includes(href.substr(1))) {
    className = cn(className, styles.selected, 'has-text-weight-bold');
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

export const NotificationComponent = ({
  userData,
  data,
  className,
  onItemClick,
  onMarkAll,
  ...props
}) => {
  const [showNotify, setShowNotify] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unReadCount, setUnReadCount] = useState(0);

  const handleOpenDropdown = () => {
    if (!!dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    setNotifications(data);
  }, [data]);

  useEffect(() => {
    const notificationCounts = notifications.filter((x) => x.isRead === false)
      .length;

    setUnReadCount(notificationCounts);
    setShowNotify(notificationCounts > 0);
  }, [notifications]);

  return (
    <div className={cn(styles.notificationContainer, className)} {...props}>
      <OutsideClickHandler onOutsideClick={handleCloseDropdown}>
        <div
          className={cn(styles.notificationContainer, {
            [styles.dropdownOpen]: dropdownOpen
          })}
          onClick={handleOpenDropdown}
          onKeyPress={handleOpenDropdown}
          tabIndex={0}
          role="button"
        >
          <i className={cn(styles.bell, 'icon-bell')}></i>
          {showNotify && (
            <span className={cn(styles.notificationCount)}>{unReadCount}</span>
          )}
        </div>
        {dropdownOpen && (
          <div className={cn(styles.dropdownContainer, styles.notification)}>
            <h2 className={cn(styles.dropdownTitle)}>Thông báo mới</h2>
            <button onClick={onMarkAll} className={cn(styles.markAll)}>
              Đã xem
            </button>
            {notifications.map((noti) => (
              <NotificationItem
                key={noti.id}
                data={noti}
                onClick={onItemClick}
              />
            ))}

            {notifications.length === 0 && (
              <p className="has-text-centered text-is-14">
                Hiện tại bạn không có thông báo nào mới
              </p>
            )}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

const NotificationItem = ({ onClick, data }) => {
  const handleItemClick = () => {
    onClick(data.id);

    if (data.action?.type === 'navigate') {
      Router.push(`/${data.action.value}`);
    }
  };

  const getTimePoint = (time) => {
    const secs = Math.floor(moment().diff(moment(time)) / 1000);
    if (secs < 60) return `${secs} giây trước`;
    if (secs < 3600) return `${Math.floor(secs / 60)} phút trước`;
    if (secs < 3600 * 24) return `${Math.floor(secs / 3600)} giờ trước`;

    return moment(time).format('HH:mm - DD/MM/YYYY').toUpperCase();
  };

  const NotificationIcon = ({ type }) => {
    if (type === 'coin')
      return <img src="/static/img/icons/icon-coin.svg" alt="coin" />;

    if (type === 'battle')
      return (
        <img src="/static/img/icons/icon-onboard-battle.svg" alt="battle" />
      );

    if (type === 'competition')
      return (
        <img
          src="/static/img/icons/icon-onboard-competition.svg"
          alt="competition"
        />
      );

    return <></>;
  };

  return (
    <div
      className={cn(styles.dropdownItem, {
        [styles.unRead]: !data.isRead
      })}
      onClick={handleItemClick}
      onKeyPress={handleItemClick}
      tabIndex={0}
      role="button"
    >
      <div className={cn(styles.imageContainer)}>
        <NotificationIcon type={data.icon} />
      </div>
      <div className={cn(styles.contentContainer)}>
        <p className={cn(styles.content)}>{data.title}</p>
        <p className={cn(styles.time)}>{getTimePoint(data.time)}</p>
      </div>
    </div>
  );
};

export default Navbar;
