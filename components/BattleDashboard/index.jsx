import React, { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '../Common/Button';
import Router from 'next/router';
import Dropdown from 'react-dropdown';
import BattleCard from '../Common/BattleCard';
import BattleRank from './BattleRank';
import Spinner from '../Common/Spinner';
import Modal from '../Common/Modal';
import StaticStepper from '../Common/StaticStepper';
import { MINUTE, ALLOWED_GRADE_ARRAY } from '../../constants';
import { handleError } from '../../utils';
import { startBattleParticipant } from '../../services/battle';
import LevelTag from '../Common/LevelTag';

const Battle = ({
  loading,
  data,
  battleGradeId,
  onChangeBattleGrade,
  animationOff
}) => {
  const handleJoinBattle = (battleId) => {
    const selectedBattle = data.find((match) => match.id === battleId);

    if (selectedBattle?.type === 'freedom') {
      setModalData(selectedBattle);
      setIsOpenModal(true);
    } else {
      Router.push(`/battle-lobby/${battleId}`);
    }
  };

  const [modalData, setModalData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const [filterOptions, setFilterOptions] = useState({
    freedom: false,
    realtime: false,
    easy: false,
    medium: false,
    hard: false
  });
  const handleUpdateFilters = (param) => {
    setFilterOptions({ ...filterOptions, ...param });
  };

  const dataWithLevelFilters = data.filter(
    (battle) =>
      (filterOptions.easy === filterOptions.medium &&
        filterOptions.medium === filterOptions.hard) ||
      filterOptions[battle?.level?.name]
  );

  const dataWithTypeFilters = dataWithLevelFilters.filter(
    (battle) =>
      filterOptions.freedom === filterOptions.realtime ||
      filterOptions[battle?.type]
  );

  dataWithTypeFilters.sort((a, b) => {
    let aTime = a?.type === 'reatime' ? a?.startTime : a?.expirationTime;
    let bTime = b?.type === 'reatime' ? b?.startTime : b?.expirationTime;
    return new Date(aTime) - new Date(bTime);
  });

  const handleJoinFreedomBattle = async (id) => {
    try {
      await startBattleParticipant(id);
      Router.push(`/battle/${id}`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {isOpenModal && (
        <ConfirmModal
          data={modalData}
          onCloseModal={handleCloseModal}
          onJoinFreedomBattle={handleJoinFreedomBattle}
        />
      )}
      <Spinner enable={loading} />
      <div className={cn('columns has-margin-y-0', styles.container)}>
        <div className={cn('column is-2 col-sidebar-left')}>
          <BattleFilters
            data={data}
            battleGradeId={battleGradeId}
            filterOptions={filterOptions}
            onUpdateFilters={handleUpdateFilters}
            onChangeBattleGrade={onChangeBattleGrade}
          />
        </div>
        <div className="column is-7 is-offset-2 has-padding-5">
          <h5 className="has-text-weight-bold has-text-centered text-is-16 has-text-grey-dark has-margin-bottom-4 has-margin-top-2">
            Hãy ghi tên mình vào Bảng Xếp Hạng bằng việc tham gia Sàn đấu
          </h5>
          <div
            className={cn(styles.content, 'battle-card-container')}
            id="scrollableDiv"
          >
            {dataWithTypeFilters.length === 0 && (
              <div className="has-text-centered">
                Không có trận đấu nào phù hợp với sự lựa chọn của bạn
              </div>
            )}
            {dataWithTypeFilters.map((battle, idx) => (
              <div
                key={`challenge-card-${battle.id}`}
                className={cn(
                  'has-margin-bottom-4',
                  !animationOff &&
                    'animate__animated animate__fadeInUp animate__fast'
                )}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <BattleCard data={battle} onJoinBattle={handleJoinBattle} />
              </div>
            ))}
          </div>
        </div>
        <div className="column is-3 col-sidebar-right">
          <BattleRank animationOff={animationOff} />
        </div>
      </div>
    </>
  );
};

const ConfirmModal = ({ data, onCloseModal, onJoinFreedomBattle }) => {
  const {
    rewards = [],
    totalQuestions = 0,
    level,
    durationInSeconds = 0,
    id,
    title
  } = data;

  const durationInMins = durationInSeconds / MINUTE;

  const Duration = (
    <>
      <p>Thời lượng:</p>
      <div className="has-margin-bottom-3"></div>
      <StaticStepper value={durationInMins} isDuration></StaticStepper>
    </>
  );

  const Bet = (
    <>
      <p>Phần thưởng:</p>
      <div className="has-margin-bottom-3"></div>
      <StaticStepper values={rewards} isBet isMultiBet></StaticStepper>
    </>
  );

  const Level = (
    <>
      <p className="has-margin-bottom-3">Cấp độ:</p>
      <LevelTag level={level.name} isSmall />
    </>
  );

  const Question = (
    <>
      <p className="has-margin-bottom-3">Số câu hỏi:</p>
      <div className={styles.questions}>{totalQuestions}</div>
    </>
  );

  const [closeModal, setCloseModal] = useState(false);

  const handleJoinFreedomBattle = () => {
    onJoinFreedomBattle(id);
    setCloseModal(true);
  };

  return (
    <Modal onCloseModal={onCloseModal} closeModal={closeModal}>
      <div
        className={cn(
          'has-text-centered has-padding-x-4 text-is-bold',
          styles.modalContainer
        )}
      >
        <div className={cn('text-is-18 ')}>THAM GIA TRẬN ĐẤU</div>
        <div className={cn('text-is-14')}>
          Bạn có chắc muốn tham gia trận đấu này không?
        </div>
        <div className="has-margin-bottom-4"></div>
        <div className={cn(styles.modalContent)}>
          <div
            className={cn(
              'text-is-20 text-is-bold is-family-secondary has-margin-bottom-4 is-uppercase'
            )}
          >
            {title}
          </div>
          <div className={cn('columns is-multiline')}>
            <div className={cn('is-half column has-text-grey')}>{Level}</div>
            <div className={cn('is-half column has-text-grey')}>{Question}</div>
            <div className={cn('is-half column has-text-grey')}>{Duration}</div>
            <div className={cn('is-half column has-text-grey')}>{Bet}</div>
          </div>
        </div>
        <div className="has-margin-bottom-4"></div>
        <div className={cn('field is-grouped is-grouped-centered')}>
          <div className={cn('control')}>
            <Button
              containerClassName={cn(styles.button)}
              onClick={handleJoinFreedomBattle}
            >
              THAM GIA
            </Button>
          </div>
          <div className={cn('control')}>
            <Button
              containerClassName={cn(styles.button)}
              outlineGradient
              className={styles.btnOutline}
              onClick={() => {
                setCloseModal(true);
              }}
            >
              BỎ QUA
            </Button>
          </div>
        </div>

        <div className={cn()}></div>
      </div>
    </Modal>
  );
};

const BattleFilters = ({
  data,
  battleGradeId,
  filterOptions,
  onChangeBattleGrade,
  onUpdateFilters
}) => {
  const grades = ALLOWED_GRADE_ARRAY.map((x) => ({
    value: `${x}`,
    label: `Lớp ${x}`
  }));

  const onNavigateToCompetition = () => {
    Router.push('/competition');
  };

  const onNavigateToChallenge = () => {
    Router.push('/challenge');
  };

  const freedomMatchesCount = data.filter((match) => match.type === 'freedom')
    .length;
  const realtimeMatchesCount = data.length - freedomMatchesCount;
  const easyMatchesCount = data.filter((match) => match.level?.name === 'easy')
    .length;
  const mediumMatchesCount = data.filter(
    (match) => match.level?.name === 'medium'
  ).length;
  const hardMatchesCount = data.length - easyMatchesCount - mediumMatchesCount;

  return (
    <div className={styles.leftCol}>
      <div>
        <p
          className={cn(
            'text-is-16 has-text-weight-bold ',
            styles.sectionTitle
          )}
        >
          Loại sàn đấu:
        </p>
        <div className="control has-margin-bottom-4">
          <div className="b-checkbox is-primary is-inline">
            <input
              type="checkbox"
              className="styled"
              id="freedom"
              checked={filterOptions.freedom}
              onChange={(e) => {
                onUpdateFilters({
                  freedom: e.target.checked
                });
              }}
            />
            <label className="text-is-14 has-margin-left-24" htmlFor="freedom">
              Tự do ({freedomMatchesCount})
            </label>
          </div>
        </div>
        <div className="control has-margin-bottom-4">
          <div className="b-checkbox is-primary is-inline">
            <input
              type="checkbox"
              className="styled"
              id="realtime"
              checked={filterOptions.realtime}
              onChange={(e) => {
                onUpdateFilters({
                  realtime: e.target.checked
                });
              }}
            />
            <label className="text-is-14 has-margin-left-24" htmlFor="realtime">
              Thời gian thực ({realtimeMatchesCount})
            </label>
          </div>
        </div>

        <p
          className={cn(
            'text-is-16 has-text-weight-bold has-margin-top-5 has-margin-bottom-3',
            styles.sectionTitle
          )}
        >
          Cấp độ:
        </p>
        <div className="control has-margin-bottom-4">
          <div className="b-checkbox is-primary is-inline">
            <i
              className={cn(
                'icon-flame has-text-success has-margin-left-24',
                styles.iconLevel
              )}
            ></i>
            <input
              type="checkbox"
              className="styled"
              id="easy"
              checked={filterOptions.easy}
              onChange={(e) => {
                onUpdateFilters({
                  easy: e.target.checked
                });
              }}
            />
            <label
              className="text-is-14 has-padding-0 has-margin-0"
              htmlFor="easy"
            >
              Dễ ({easyMatchesCount})
            </label>
          </div>
        </div>
        <div className="control has-margin-bottom-4">
          <div className="b-checkbox is-primary is-inline">
            <i
              className={cn(
                'icon-flame has-text-warning has-margin-left-24',
                styles.iconLevel
              )}
            ></i>
            <input
              type="checkbox"
              className="styled"
              id="medium"
              checked={filterOptions.medium}
              onChange={(e) => {
                onUpdateFilters({
                  medium: e.target.checked
                });
              }}
            />
            <label
              className="text-is-14 has-padding-0 has-margin-0"
              htmlFor="medium"
            >
              Vừa ({mediumMatchesCount})
            </label>
          </div>
        </div>
        <div className="control has-margin-bottom-4">
          <div className="b-checkbox is-primary is-inline">
            <i
              className={cn(
                'icon-flame has-text-danger has-margin-left-24',
                styles.iconLevel
              )}
            ></i>
            <input
              type="checkbox"
              className="styled"
              id="difficul"
              checked={filterOptions.hard}
              onChange={(e) => {
                onUpdateFilters({
                  hard: e.target.checked
                });
              }}
            />
            <label
              className="text-is-14 has-padding-0 has-margin-0"
              htmlFor="difficul"
            >
              Khó ({hardMatchesCount})
            </label>
          </div>
        </div>

        <div className="has-margin-top-5">
          <p
            className={cn(
              'text-is-16 has-text-weight-bold has-margin-bottom-3',
              styles.sectionTitle
            )}
          >
            Trình độ
          </p>
          <Dropdown
            controlClassName={styles.dropdownControl}
            menuClassName={styles.menuDropdown}
            options={grades}
            onChange={onChangeBattleGrade}
            value={battleGradeId}
            placeholder="Select an option"
          />
        </div>
      </div>

      <div className={styles.footerContainer}>
        <div className="is-flex has-item-center">
          <p className={styles.divider}></p>
          <p className="text-is-16 has-margin-left-3 has-margin-right-3">
            hoặc
          </p>
          <p className={styles.divider}></p>
        </div>
        <Button
          className={styles.button}
          size="small"
          onClick={onNavigateToCompetition}
          containerClassName={cn('has-margin-top-4', styles.button)}
        >
          THÁCH ĐẤU
        </Button>
        <Button
          size="small"
          containerClassName={cn('has-margin-top-4', styles.button)}
          outlineGradient
          onClick={onNavigateToChallenge}
          className={styles.btnOutline}
        >
          THỬ THÁCH
        </Button>
      </div>
    </div>
  );
};

export default Battle;
