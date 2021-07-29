import React from 'react';
import cn from 'classnames';
import Router from 'next/router';

import styles from './styles.module.scss';
import Button from '../Common/Button';
import CoinsFrame from '../Common/CoinsFrame';
import FacebookButton from '../Common/Button/FacebookButton';
import GradientText from '../Common/GradientText';
import SimpleUserCard from '../Common/SimpleUserCard';
import Avatar from '../Common/Avatar';
import moment from 'moment';
import { SUBJECT_PROPERTIES } from '../../constants';
import { FacebookShareButton } from 'react-share';

const DELAY_COINS = 2000;
const CompetitionResult = ({ users, user, isLoading, onGoToReview }) => {
  const myResult = users.find((x) => x.userId === user.id) || {
    score: 0,
    totalQuestion: 0,
    coin: 0
  };
  const result = myResult && myResult.isWinner ? 'win' : 'lose';

  const onGoToHomePage = () => {
    Router.replace(`/competition`);
  };

  const shareUrl = `${process.env.WEB_URL}/sharing-result`;
  const winningQuote = `${
    myResult.score / myResult.totalQuestion >= 0.8
      ? `Với ${myResult.score}/${myResult.totalQuestion} câu trả lời chính xác`
      : ''
  } ${
    user.displayName
  } đã xuất sắc vượt qua nhiều người chơi khác và giành chức vô địch với phần thưởng hấp dẫn. Tham gia XAGOe để thách đấu cậu ấy nào!!`;
  const losingQuote = `${user.displayName} đã xuất sắc hoàn thành cuộc thi đấu cùng nhiều người chơi khác. Tham gia XAGOe ngay để so tài cùng cậu ấy nào!!`;

  const shareQuote = result === 'win' ? winningQuote : losingQuote;

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
          <div className={cn(styles.title, 'has-margin-bottom-5')}>
            <GradientText variant={result === 'win' ? 'orange' : 'normal'}>
              {result === 'win' ? 'XIN CHÚC MỪNG!' : 'THUA MẤT RỒI'}
            </GradientText>
          </div>
          <div
            className={cn(styles.coins, 'has-margin-bottom-5', styles[result])}
          >
            <CoinsFrame size="normal"></CoinsFrame>
            <GradientText
              variant={result === 'win' ? 'orange' : 'danger'}
              className="has-margin-left-4"
            >
              {`${myResult.isWinner ? '+' : ''}${myResult.coin}`}
            </GradientText>
          </div>
          <div
            className={cn(
              styles.description,
              'text-is-14 has-text-weight-bold has-text-grey has-text-centered has-margin-bottom-5'
            )}
          >
            {myResult.isWinner
              ? `Bạn là nhà vô địch trong cuộc thách đấu này với ${myResult.score}/${myResult.totalQuestion} câu trả lời chính xác!`
              : `Bạn đã trả lời đúng ${myResult.score}/${myResult.totalQuestion} câu hỏi, lần sau cố gắng hơn bạn nhé!`}
          </div>

          <div className="has-margin-bottom-6"></div>
          <Button
            className={cn(styles.button, 'has-margin-bottom-4')}
            leftIconName="icon-arrow-left"
            size="medium"
            onClick={onGoToReview}
            outline
          >
            Dò lại kết quả
          </Button>

          <div>{result === 'win' && Share}</div>
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
          <div>{result !== 'win' && Share}</div>
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

const CompetitionRank = ({ users, user, isLoading }) => {
  return (
    <div className="has-text-weight-bold ">
      <div className="has-margin-bottom-5"></div>
      <div className="has-margin-bottom-5 has-text-grey has-text-centered">
        Xếp hạng chung cuộc:
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
                {index === 0 && (
                  <div
                    className={cn(styles.coins)}
                    style={{ animationDelay: `${DELAY_COINS}ms` }}
                  >
                    <CoinsFrame
                      badge={`+${simpleUser.coin}`}
                      isOrangeBadge
                    ></CoinsFrame>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CompetitionInfo = ({ data, isLoading }) => {
  const { grade, subject, creator, startTime, participants } = data;

  const selectedSubject = SUBJECT_PROPERTIES.find((x) => x.id === subject?.id)
    ?.shortName;

  const getDateTime = (time) => {
    if (!time) return '';
    return moment(time).format('DD/MM/YYYY - hh:mm');
  };

  const displayParticipants = participants?.slice(0, 4);
  const hiddenParticipantCount =
    participants?.length - 4 > 0 ? participants?.length - 4 : 0;

  if (isLoading) return <></>;
  return (
    <div className={cn(styles.competitionInfoContainer)}>
      <div className={cn(styles.title)}>Cuộc thách đấu:</div>
      <div className={cn(styles.subject)}>
        {selectedSubject} {grade?.id}
      </div>
      <div className={cn(styles.title)}>Được tạo bởi:</div>
      <div className={cn(styles.creatorContainer)}>
        <Avatar url={creator?.avatar} displayName={creator?.displayName} />
        <div className={cn(styles.creator)}>
          <div className={cn(styles.creatorName)}>{creator?.displayName}</div>
          <div className={cn(styles.creatorUsername)}>@{creator?.username}</div>
        </div>
      </div>
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

export { CompetitionResult, CompetitionRank, CompetitionInfo };
