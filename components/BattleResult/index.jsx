/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import cn from 'classnames';
import Router from 'next/router';

import styles from './styles.module.scss';
import Button from '../Common/Button';
import FacebookButton from '../Common/Button/FacebookButton';
import GradientText from '../Common/GradientText';
import SimpleUserCard from '../Common/SimpleUserCard';
import Spinner from '../Common/Spinner';
import Coin from '../Common/Coin';
import moment from 'moment';
import Avatar from '../Common/Avatar';
import { FacebookShareButton } from 'react-share';

const BattleResult = ({ users, user, isLoading, onGoToReview }) => {
  const myResult = users.find((x) => x.userId === user.id) || {
    score: 0,
    totalQuestion: 0,
    coin: 0,
    isWinner: false,
    status: 'completed',
    order: 2
  };

  const isWin = myResult?.order <= 3;
  const isLessThanThreshold = myResult.score <= myResult.totalQuestion / 5;

  const onGoToHomePage = () => {
    Router.replace(`/battle`);
  };

  const [showGift, setShowGift] = useState(false);
  const handleOpenGift = () => {
    setShowGift(true);
  };

  const WinningIcon = (
    <>
      <div
        className={cn(styles.giftContainer, { [styles.showGift]: showGift })}
      >
        {showGift ? (
          <div
            className={cn(
              styles.coinsContainer,
              'animate__animated animate__heartBeat'
            )}
          >
            <Coin />
            <span className="is-family-secondary text-is-40 has-text-weight-bold text-is-orange-gradient has-margin-left-3">
              +{myResult.coin}
            </span>
          </div>
        ) : (
          <div
            className={cn(styles.winningContainer, 'has-margin-bottom-2')}
            onClick={handleOpenGift}
          >
            <img src="/static/img/icons/icon-gift.svg" alt="gift" />
            <br></br>
            <span
              className={cn(
                'text-is-purple-gradient text-is-bold is-family-secondary text-is-20'
              )}
            >
              Mở quà!
            </span>
          </div>
        )}
      </div>
    </>
  );

  const LosingIcon = (
    <>
      <div
        className={cn(styles.giftContainer, 'has-margin-bottom-5', styles.lose)}
      >
        <img src="/static/img/icons/icon-fight.svg" alt="gift" />
      </div>
    </>
  );

  const shareUrl = `${process.env.WEB_URL}/sharing-result`;
  const winningQuote = `${
    myResult.score / myResult.totalQuestion >= 0.8
      ? `Với ${myResult.score}/${myResult.totalQuestion} câu trả lời chính xác`
      : ''
  } ${
    user.displayName
  } đã xuất sắc vượt qua nhiều người chơi khác và mang về cho mình phần thưởng hấp dẫn. Tham gia XAGOe để thách đấu cậu ấy nào!!`;
  const losingQuote = `${user.displayName} đã xuất sắc hoàn thành cuộc thi đấu cùng nhiều người chơi khác. Tham gia XAGOe ngay để so tài cùng cậu ấy nào!!`;

  const shareQuote = isWin ? winningQuote : losingQuote;

  const Share = (
    <FacebookShareButton url={shareUrl} quote={shareQuote}>
      <FacebookButton className={cn(styles.button)} onClick={() => {}}>
        Chia sẻ kết quả
      </FacebookButton>
    </FacebookShareButton>
  );

  return (
    <div
      className={cn(
        styles.container,
        'competition-container has-text-centered'
      )}
    >
      {isLoading ? (
        <></>
      ) : myResult.status === 'completed' ? (
        <>
          <div className={cn('has-text-grey text-is-14 has-margin-bottom-2')}>
            {isWin && !isLessThanThreshold && <b>Hoàn thành trận đấu!</b>}
          </div>
          <div className={cn(styles.title, 'has-margin-bottom-5')}>
            <GradientText variant={isWin ? 'orange' : 'normal'}>
              {isWin
                ? isLessThanThreshold
                  ? 'HOÀN THÀNH TRẬN ĐẤU'
                  : 'XIN CHÚC MỪNG'
                : 'CHÚC MAY MẮN LẦN SAU!'}
            </GradientText>
          </div>

          <div
            style={{
              width: `${isLessThanThreshold && isWin ? '350' : '280'}px`
            }}
            className={cn(
              styles.description,
              'text-is-14 has-text-weight-bold has-text-grey has-text-centered has-margin-bottom-4'
            )}
          >
            Bạn {isLessThanThreshold ? 'chỉ ' : 'đã'} trả lời đúng{' '}
            {`${myResult.score}/${myResult.totalQuestion}`} câu hỏi{' '}
            {isWin
              ? isLessThanThreshold
                ? 'của cuộc đấu này. Bạn hãy cố gắng thêm nữa vào lần sau nhé!'
                : `của cuộc đấu này và xếp hạng ${myResult?.order} trong tất cả người chơi.`
              : '. Bạn cần thêm 1 chút cố gắng nữa để lọt top 3 nhé!!'}
          </div>

          {isWin ? WinningIcon : LosingIcon}

          <div className="has-margin-bottom-4"></div>

          <div className="has-margin-bottom-5"></div>
          <Button
            className={cn(styles.button, 'has-margin-bottom-4')}
            leftIconName="icon-arrow-left"
            size="medium"
            onClick={onGoToReview}
            outline
          >
            Dò lại kết quả
          </Button>

          <div>{isWin && Share}</div>
          <div className="has-margin-bottom-6"></div>
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
          <div>{!isWin && Share}</div>
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

const BattleRank = ({ users, user, isLoading }) => {
  return (
    <div className="has-text-weight-bold ">
      <div className="has-margin-bottom-5"></div>
      <div className="has-margin-bottom-5 has-text-grey has-text-centered">
        BXH chung cuộc trận đấu này:
      </div>
      {isLoading ? (
        <></>
      ) : (
        <div className={styles.rankContainer}>
          {users?.map((simpleUser, index) => (
            <div
              key={`user-${simpleUser.id}`}
              className={cn(styles.rank, 'has-margin-bottom-4')}
            >
              <div
                style={{ animationDelay: `${index * 100}ms` }}
                className={cn(styles.position, {
                  [styles.firstPos]: index === 0
                })}
              >
                {index + 1}
              </div>
              <div
                className={cn(styles.userInfo)}
                style={{
                  width: '100%',
                  animationDelay: `${(index + users.length * 1.5) * 100}ms`
                }}
              >
                <SimpleUserCard
                  isMySelf={simpleUser.userId === user.id}
                  data={{ ...simpleUser, subtitle: simpleUser.record }}
                ></SimpleUserCard>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BattleInfo = ({ data, isLoading }) => {
  const { title, startTime, participants } = data;

  const getDateTime = (time) => {
    if (!time) return '';
    return moment(time).format('DD/MM/YYYY - hh:mm');
  };

  const displayParticipants = participants?.slice(0, 4);
  const hiddenParticipantCount =
    participants?.length - 4 > 0 ? participants?.length - 4 : 0;

  if (isLoading) return <></>;

  return (
    <div className={cn(styles.battleInfoContainer)}>
      <div className={cn(styles.title)}>Trận đấu:</div>
      <div className={cn(styles.battleTitle)}>{title}</div>

      <div className={cn(styles.title)}>Được bắt đầu vào lúc:</div>
      <div className={cn(styles.date)}>{getDateTime(startTime)}</div>
      <div className={cn(styles.title)}>
        Người tham gia ({participants?.length}):
      </div>
      <div className={cn(styles.participantsContainer)}>
        {displayParticipants?.map((user, index) => (
          <Avatar
            key={user.id}
            size="small"
            url={user.avatar}
            displayName={user.displayName}
            hasTooltip
          ></Avatar>
        ))}
        {hiddenParticipantCount > 0 && (
          <span className={styles.more}>+{hiddenParticipantCount}</span>
        )}
      </div>
    </div>
  );
};

export { BattleResult, BattleRank, BattleInfo };
