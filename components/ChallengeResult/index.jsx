import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Router from 'next/router';

import styles from './styles.module.scss';
import Button from '../Common/Button';
import FacebookButton from '../Common/Button/FacebookButton';
import GradientText from '../Common/GradientText';
import Spinner from '../Common/Spinner';
import Coin from '../Common/Coin';
import Modal from '../Common/Modal';
import { LEVEL_PROPERTIES } from '../../constants';

const ChallengeResult = ({
  users,
  user,
  isLoading,
  onGoToReview,
  challengeId,
  nextChallengeId,
  onGoToNextChallenge,
  finishAllChallenges
}) => {
  const myResult = users[0] || {
    id: 137,
    userId: 4,
    username: 'loc.tran1733',
    displayName: 'Loc Tran',
    avatar: null,
    status: 'completed',
    startTime: '2020-06-09T02:03:22.889Z',
    endTime: '2020-06-09T02:04:16.896Z',
    progress: 10,
    score: 7,
    totalQuestion: 10,
    isPassed: false,
    level: 'easy'
  };
  const levelLabel = LEVEL_PROPERTIES.find((x) => x.name === myResult.level)
    .label;

  const isWin = myResult?.isPassed;

  const onTryAgain = () => {
    Router.push(`/challenge/${challengeId}`);
  };

  const onGoToHomePage = () => {
    Router.push(`/challenge`);
  };

  const handleGoNextChallenge = () => {
    if (!finishAllChallenges) {
      onGoToNextChallenge();
    } else {
      setOpenModal(true);
    }
  };

  const WinningIcon = (
    <>
      <div className={cn(styles.levelContainer)}>
        <span>Cấp độ:</span>
        <span className={cn(styles.level, styles[myResult.level])}>
          <i className="icon-flame"></i>
          {levelLabel}
        </span>
      </div>

      <div className={cn(styles.questionPackContainer)}>
        <div className={cn(styles.title)} data-tooltip={myResult.title}>
          <span>{myResult.title}</span>
        </div>
        <div className={cn(styles.packInfo)}>
          <div className={cn(styles.quantity)}>
            <i className="icon-question-circle" />
            <span>{myResult.totalQuestion}</span>
          </div>
          <div className={cn(styles.coins)}>
            <Coin size="normal" />
            <span className="has-margin-left-3">{myResult.coin}</span>
          </div>
        </div>
      </div>

      <div className="has-margin-bottom-4"></div>

      <div className="has-margin-bottom-6">
        <Button
          className={cn(styles.button, 'has-margin-right-4')}
          leftIconName="icon-arrow-left"
          size="medium"
          onClick={onGoToReview}
          outline
        >
          Dò lại kết quả
        </Button>
        <Button
          className={cn(styles.button)}
          rightIcon={
            <img
              className={styles.nextIcon}
              src={'/static/img/icons/icon-arrow-right.svg'}
              alt="next icon"
            />
          }
          textPrimary
          size="medium"
          onClick={handleGoNextChallenge}
          outline
        >
          Thử thách tiếp
        </Button>
      </div>
      {/* <div>
        <FacebookButton className={cn(styles.button)} onClick={() => {}}>
          Chia sẻ kết quả
        </FacebookButton>
      </div> */}
      <div className="has-margin-bottom-4"></div>
    </>
  );

  const LosingIcon = (
    <>
      <div className={styles.lock}>
        <i className="icon-lock"></i>
      </div>
      <div className="has-margin-bottom-6"></div>
      <Button
        className={cn(styles.button, 'has-margin-bottom-4')}
        rightIcon={
          <img
            className={styles.nextIcon}
            src={'/static/img/icons/icon-rotate.svg'}
            alt="next icon"
          />
        }
        textPrimary
        size="medium"
        onClick={onTryAgain}
        outline
      >
        Thử lại lần nữa
      </Button>
      <div className="has-margin-bottom-6"></div>
    </>
  );

  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    setCloseModal(false);
  };

  useEffect(() => {
    if (finishAllChallenges) setOpenModal(true);
  }, [finishAllChallenges]);

  return (
    <div
      className={cn(
        styles.container,
        'competition-container has-text-centered'
      )}
    >
      {openModal && (
        <Modal closeModal={closeModal} onCloseModal={handleCloseModal}>
          <div className={styles.confirmModal}>
            <h4 className={styles.modalTitle}>XIN CHÚC MỪNG</h4>
            <p className="text-is-14 has-margin-bottom-5 has-text-weight-medium">
              Bạn đã chinh phục tất cả thử thách của môn học này, thử sức với
              các môn khác nhé!!
            </p>
            <div className="has-margin-top-4 has-margin-bottom-4"></div>
            <div className="has-margin-bottom-5 has-margin-top-4">
              <Button
                onClick={onGoToHomePage}
                size="medium"
                className={styles.btnOk}
              >
                VỀ TRANG CHỦ
              </Button>
              <Button
                onClick={() => {
                  setCloseModal(true);
                }}
                containerClassName={styles.btnCancel}
                className={styles.button}
                outlineGradient
                size="medium"
              >
                QUAY LẠI
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isLoading ? (
        <Spinner enable={true} isLocal isDark />
      ) : myResult.status === 'completed' || myResult.status === 'submitted' ? (
        <>
          <div className={cn('has-text-grey text-is-14 has-margin-bottom-2')}>
            {isWin && <b>Hoàn thành thứ thách!</b>}
          </div>
          <div className={cn(styles.title, 'has-margin-bottom-5')}>
            <GradientText variant={isWin ? 'orange' : 'normal'}>
              {isWin ? 'XIN CHÚC MỪNG' : 'THỬ LẠI NHÉ!'}
            </GradientText>
          </div>

          <div
            className={cn(
              styles.description,
              'text-is-14 has-text-weight-bold has-text-grey has-text-centered has-margin-bottom-5'
            )}
          >
            {isWin ? (
              <p>
                Bạn đã chinh phục thành công thử thách này.
                <br />
                Tiếp tục chinh phục thử thách tiếp theo nào!!!
              </p>
            ) : (
              <p>
                Bạn đã trả lời đúng {myResult.score}/{myResult.totalQuestion} (
                {Math.round((myResult.score / myResult.totalQuestion) * 100)}%)
                câu hỏi của thử thách này. Thử lại lần nữa nhé!
              </p>
            )}
          </div>

          {isWin ? WinningIcon : LosingIcon}

          <div>
            <Button
              className={cn(styles.button)}
              rightIconName="icon-layout"
              size="medium"
              onClick={onGoToHomePage}
              outline
            >
              Về trang chủ
            </Button>
          </div>
        </>
      ) : (
        <div className="has-margin-bottom-5">
          <div
            className={cn(
              styles.description,
              'text-is-14 has-text-weight-bold has-text-grey has-text-centered has-margin-bottom-5 has-margin-top-5'
            )}
          >
            * Các đối thủ vẫn chưa hoàn thành cuộc thách đấu nên bạn phải đợi
            thêm 1 chút nữa để xem được kết quả nhé!
          </div>

          <div className="has-margin-bottom-4">
            <Button
              className={cn(styles.button)}
              rightIconName="icon-layout"
              size="medium"
              onClick={onGoToHomePage}
              outline
            >
              Về trang chủ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { ChallengeResult };
