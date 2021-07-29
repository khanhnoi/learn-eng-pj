import React, { useState, useEffect, useRef } from 'react';
import CompetitionInvitationCard from './CompetitionInvitationCard';
import cn from 'classnames';
import Input from '../Common/Input';
import InviteUserCard from '../Common/InviteUserCard';
import styles from './styles.module.scss';
import Spinner from '../Common/Spinner';
import _ from 'lodash';
import Stepper from '../Common/Stepper';
import Button from '../Common/Button';
import Router from 'next/router';
import {
  getMyCompetitions,
  acceptCompetitionParticipant,
  declineCompetitionParticipant
} from '../../services/competition';
import { handleError } from '../../utils';
import { User } from '../../hooks/useUser';
import { searchUsers, getUserStats } from '../../services/user';
import { Competition } from '../../hooks/useCompetition';
import ConfirmModal from '../Common/ConfirmModal';
import { MAX_INVITATION_PEOPLE } from '../../constants';
import { toast } from 'react-toastify';

const InvitationList = ({
  onMouseChange,
  competitions,
  user,
  onAccept,
  onDecline
}) => {
  return (
    <div className={cn(styles.invitationSubContainer)}>
      <div className="has-margin-bottom-5"></div>

      {competitions.length === 0 && (
        <div className={styles.userPlaceHolder}>
          <div className={styles.placeholder}>
            <div className={styles.avatarHolder}></div>
          </div>
          <div className="text-is-center">
            <p className="has-padding-4 text-is-14 has-text-centered">
              Hiện tại bạn không có lời mời thách đấu nào. Hãy mời bạn bè và tạo
              ra cuộc thách đấu của chính mình nào!
            </p>
          </div>
          <img
            className={styles.vector}
            src="/static/img/competition/img-vector-bottom.svg"
            alt="vector"
          />
        </div>
      )}

      {competitions.map((data, index) => (
        <div
          key={data.id}
          className={cn('', styles.invitationCard)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CompetitionInvitationCard
            data={data}
            myId={user.id}
            onAcceptClick={onAccept}
            onDeclineClick={onDecline}
            onMouseChange={onMouseChange}
          ></CompetitionInvitationCard>
        </div>
      ))}
    </div>
  );
};

const CompetitionSelection = ({ animationOff }) => {
  const [userData, setUserData] = useState({});
  const initData = async () => {
    const localUser = localStorage.getItem('user') || '{}';
    const user = JSON.parse(localUser);
    setUserData(user);
    getUsers('', [user?.id]);
  };

  useEffect(() => {
    initData();
  }, []);

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers = async (keyword, excludes) => {
    try {
      setIsUserLoading(true);
      const res = await searchUsers({ searchTerm: keyword, exclude: excludes });
      const users = res.data.map((x) => ({ ...x }));
      setUsers(users);
      setIsUserLoading(false);
    } catch (error) {
      setIsUserLoading(false);
      handleError(error);
    }
  };

  const [participants, setParticipants] = useState([]);
  const onAddUser = (user) => {
    if (participants.length >= MAX_INVITATION_PEOPLE) return;
    const newParticipants = _.uniqBy([...participants, user], 'id');
    setParticipants(newParticipants);
    const newUsers = users.filter((x) => x.id !== user.id);
    setUsers(newUsers);
  };

  const onRemoveUser = (user) => {
    const newUsers = _.uniqBy([...users, user], 'id');
    setUsers(newUsers);
    const newParticipants = participants.filter((x) => x.id !== user.id);
    setParticipants(newParticipants);
  };

  const debounceSearch = useRef(
    _.debounce((value, excludes) => getUsers(value, excludes), 200)
  );

  const [keyword, setKeyword] = useState('');
  const onKeywordChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    const excludedCurrentUser = userData.id ? [userData.id] : [];
    const exclude = [...excludedCurrentUser, ...participants.map((x) => x.id)];
    debounceSearch.current(value, exclude, [value]);
  };

  const [bet, setBet] = useState(10);
  const onBetChange = (bet) => {
    setBet(bet);
  };

  const handleStoreCompetitionInfo = (participants, bet) => {
    localStorage.setItem(
      'competitionInfo',
      JSON.stringify({ participants, bet })
    );
  };

  const { user } = User.useContainer();
  const availableToCreate = () => {
    const userCoin = user.totalCoin;
    if (userCoin < bet) return false;
    return true;
  };

  const onCreateCompetition = () => {
    if (!availableToCreate()) {
      setShowModal(true);
      return;
    }
    handleStoreCompetitionInfo(participants, bet);
    Router.push('/competition-configuration');
  };

  const [showModal, setShowModal] = useState(false);

  const handleGoToChallenge = () => {
    Router.push('/challenge');
  };

  return (
    <>
      <ConfirmModal
        isOpen={showModal}
        title="KHÔNG THỂ TẠO TRẬN ĐẤU"
        description="Rất tiếc bạn không đủ Xcoin để tạo trận đấu. Hãy chinh phục những thử thách để có được nhiều Xcoin hơn nhé!"
        acceptButton="THỬ THÁCH"
        declineButton="QUAY LẠI"
        onClose={() => {
          setShowModal(false);
        }}
        onAccept={handleGoToChallenge}
      />
      <div className={cn('has-text-centered')}>
        <div className={cn('has-margin-bottom-4')}></div>
        <div className={cn('has-margin-bottom-4 has-text-weight-medium')}>
          Mời bạn bè và bắt đầu cuộc thách đấu <br /> để xem ai “đỉnh” hơn!
        </div>
        <div className={cn(styles.roomContainer)}>
          <Input
            id="input23"
            value={keyword}
            onValueChange={onKeywordChange}
            type="input"
            placeholder="Nhập tên người chơi để tìm kiếm..."
            iconName="icon-search"
            className={styles.searchBox}
          ></Input>

          <div className={cn('has-margin-bottom-4')}>
            <div className="columns  is-variable is-8">
              <div className="column is-6">
                <h5
                  className={cn(
                    'has-text-left has-margin-bottom-4',
                    styles.cluesText
                  )}
                >
                  {keyword
                    ? 'Kết quả tìm kiếm:'
                    : 'Gợi ý một số người bạn để rủ chơi cùng nè:'}
                </h5>
                <div className={cn(styles.userContainer)}>
                  {isUserLoading ? (
                    <Spinner
                      className={styles.spinner}
                      enable={isUserLoading}
                      isLocal
                      isDark
                    ></Spinner>
                  ) : (
                    users.map((user, index) => (
                      <div
                        className={cn(
                          'has-margin-bottom-4 has-text-left',
                          styles.userInvitationCard,
                          styles.touchable,
                          { [styles.animationOff]: animationOff }
                        )}
                        key={`user${user.id}`}
                        data-user={`user${user.id}`}
                        onClick={() => {
                          onAddUser(user);
                        }}
                        onKeyPress={() => {
                          onAddUser(user);
                        }}
                        role="button"
                        tabIndex="0"
                        style={{ animationDelay: `${100 * index}ms` }}
                      >
                        <InviteUserCard
                          data={user}
                          onAdd={onAddUser}
                          hasAction
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="column is-6">
                <h5 className="text-is-14 has-text-weight-bold has-margin-bottom-4">
                  Danh sách mời: ({participants.length}/{MAX_INVITATION_PEOPLE})
                </h5>
                <div className={cn(styles.userContainer)}>
                  {participants.length === 0 && (
                    <div className={styles.userPlaceHolder}>
                      <div className={styles.placeholder}>
                        <div className={styles.avatarHolder}></div>
                      </div>
                      <img
                        className={styles.vector}
                        src="/static/img/competition/img-vector.svg"
                        alt="vector"
                      />
                      <div className="text-is-center">
                        <p className="has-padding-4 text-is-14">
                          Chọn bạn ở cột bên trái để thêm vào danh sách mời bạn
                          nhé
                        </p>
                      </div>
                    </div>
                  )}
                  {participants.map((user, index) => (
                    <div
                      className={cn(
                        'has-margin-bottom-4 has-text-left',
                        styles.userInvitationCard,
                        { [styles.animationOff]: animationOff }
                      )}
                      data-participant={`user${user.id}`}
                      key={`participant${user.id}`}
                    >
                      <InviteUserCard
                        currentState={1}
                        onRemove={onRemoveUser}
                        data={user}
                        hasAction
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={cn(styles.buttonContainer)}>
            <div className="">
              <h6 className="text-is-14 has-text-weight-medium">
                Bạn muốn đặt cược bao nhiêu?
              </h6>
              <Stepper
                type="bet"
                min={10}
                max={(userData && userData.totalCoin) || 1000}
                step={10}
                onChange={onBetChange}
                value={bet}
                className="has-padding-bottom-0"
                animationOff={animationOff}
              ></Stepper>
            </div>
            <Button
              rightIconName="icon-arrow-bold-right"
              size="xlarge"
              hasShadow
              disabled={participants.length === 0}
              className={cn(styles.mainButton, 'has-margin-0')}
              onClick={onCreateCompetition}
            >
              TẠO CUỘC ĐẤU
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const CompetitionStatistic = () => {
  const [data, setData] = useState({});
  const getStats = async () => {
    const res = await getUserStats();
    setData(res.data);
  };
  useEffect(() => {
    getStats();
  }, []);

  const { competitionWonCount, competitionCount } = data;

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
    <div
      className={cn(styles.competitionStatisticContainer, 'has-text-centered')}
    >
      <div
        className={cn('has-text-grey has-text-weight-bold has-margin-bottom-4')}
      >
        Thống kê cá nhân:
      </div>
      <div className={styles.statisContainer}>
        <div className={cn('')}>
          <div className={cn(styles.statisType)}>
            {strike}
            <span>Số trận đấu</span>
            {strike}
          </div>

          <span
            className={cn(
              styles.statis,
              'text-is-purple-gradient is-family-secondary has-text-weight-bold'
            )}
          >
            {competitionCount ?? 0}
          </span>
        </div>
        <div className={cn('')}>
          <div className={cn(styles.statisType)}>
            {strike}
            <span>Lần về nhất</span>
            {strike}
          </div>
          <span
            className={cn(
              styles.statis,
              'text-is-orange-gradient is-family-secondary has-text-weight-bold'
            )}
          >
            {competitionWonCount ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export const CompetitionDashboard = ({ animationOff }) => {
  const { user } = User.useContainer();
  const [loading, setLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const onMouseChange = (state) => {
    setExpanded(state);
  };

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

  const availableToJoin = (competitionId) => {
    const competitionInfo = competitions.find(
      (item) => item.id === competitionId
    );
    const bet = competitionInfo?.bet;
    const userCoin = user?.totalCoin;
    if (userCoin < bet) return false;
    return true;
  };

  const [showModal, setShowModal] = useState(false);

  const handleGoToChallenge = () => {
    Router.push('/challenge');
  };

  const handleLocalError = (error) => {
    if (error?.response?.data?.code === 'E__INVALID_OPERATION_ERROR') {
      toast.error(
        'Trận đấu này đã được diễn ra, bấm F5 hoặc tải lại trang để cập nhật bạn nhé!!'
      );
    } else {
      handleError(error);
    }
  };

  const onAccept = async (participantId, competitionId) => {
    if (!availableToJoin(competitionId)) {
      setShowModal(true);
      return;
    }

    try {
      setLoading(true);
      await acceptCompetitionParticipant(competitionId, participantId);
      Router.push(`/competition-lobby/${competitionId}`);
    } catch (error) {
      handleLocalError(error);
    } finally {
      setLoading(false);
    }
  };

  const onDecline = async (participantId, competitionId) => {
    try {
      setLoading(true);
      await declineCompetitionParticipant(competitionId, participantId);
      getCompetitions();
    } catch (error) {
      handleLocalError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={showModal}
        title="KHÔNG THỂ THAM GIA TRẬN ĐẤU"
        description="Rất tiếc bạn không đủ Xcoin để tham gia trận đấu. Hãy chinh phục những thử thách để có được nhiều Xcoin hơn nhé!"
        acceptButton="THỬ THÁCH"
        declineButton="QUAY LẠI"
        onClose={() => {
          setShowModal(false);
        }}
        onAccept={handleGoToChallenge}
      />
      <Spinner enable={loading}></Spinner>
      <div className={cn(styles.competitionContainer)}>
        <div
          className={cn(styles.invitationContainer, {
            [styles.expanded]: expanded
          })}
        >
          <InvitationList
            onMouseChange={onMouseChange}
            competitions={competitions}
            user={user}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        </div>
        <div className={cn(styles.competitionFriendsContainer)}>
          <div className="columns" style={{ marginTop: '0' }}>
            <div className="column">
              <CompetitionSelection animationOff={animationOff} />
            </div>
            <div className="column is-4">
              <CompetitionStatistic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
