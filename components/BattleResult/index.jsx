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
              M??? qu??!
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
      ? `V???i ${myResult.score}/${myResult.totalQuestion} c??u tr??? l???i ch??nh x??c`
      : ''
  } ${
    user.displayName
  } ???? xu???t s???c v?????t qua nhi???u ng?????i ch??i kh??c v?? mang v??? cho m??nh ph???n th?????ng h???p d???n. Tham gia XAGOe ????? th??ch ?????u c???u ???y n??o!!`;
  const losingQuote = `${user.displayName} ???? xu???t s???c ho??n th??nh cu???c thi ?????u c??ng nhi???u ng?????i ch??i kh??c. Tham gia XAGOe ngay ????? so t??i c??ng c???u ???y n??o!!`;

  const shareQuote = isWin ? winningQuote : losingQuote;

  const Share = (
    <FacebookShareButton url={shareUrl} quote={shareQuote}>
      <FacebookButton className={cn(styles.button)} onClick={() => {}}>
        Chia s??? k???t qu???
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
            {isWin && !isLessThanThreshold && <b>Ho??n th??nh tr???n ?????u!</b>}
          </div>
          <div className={cn(styles.title, 'has-margin-bottom-5')}>
            <GradientText variant={isWin ? 'orange' : 'normal'}>
              {isWin
                ? isLessThanThreshold
                  ? 'HO??N TH??NH TR???N ?????U'
                  : 'XIN CH??C M???NG'
                : 'CH??C MAY M???N L???N SAU!'}
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
            B???n {isLessThanThreshold ? 'ch??? ' : '????'} tr??? l???i ????ng{' '}
            {`${myResult.score}/${myResult.totalQuestion}`} c??u h???i{' '}
            {isWin
              ? isLessThanThreshold
                ? 'c???a cu???c ?????u n??y. B???n h??y c??? g???ng th??m n???a v??o l???n sau nh??!'
                : `c???a cu???c ?????u n??y v?? x???p h???ng ${myResult?.order} trong t???t c??? ng?????i ch??i.`
              : '. B???n c???n th??m 1 ch??t c??? g???ng n???a ????? l???t top 3 nh??!!'}
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
            D?? l???i k???t qu???
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
              V??? trang ch???
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
            * C??c ?????i th??? v???n ch??a ho??n th??nh cu???c th??ch ?????u n??n b???n ph???i ?????i
            th??m 1 ch??t n???a ????? xem ???????c k???t qu??? nh??!
          </div>

          <div className="has-margin-bottom-4">
            <Button
              className={cn(styles.button)}
              rightIconName="icon-layout"
              size="medium"
              onClick={onGoToHomePage}
              outline
            >
              V??? trang ch???
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
        BXH chung cu???c tr???n ?????u n??y:
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
      <div className={cn(styles.title)}>Tr???n ?????u:</div>
      <div className={cn(styles.battleTitle)}>{title}</div>

      <div className={cn(styles.title)}>???????c b???t ?????u v??o l??c:</div>
      <div className={cn(styles.date)}>{getDateTime(startTime)}</div>
      <div className={cn(styles.title)}>
        Ng?????i tham gia ({participants?.length}):
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
