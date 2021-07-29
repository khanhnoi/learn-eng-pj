/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '../../Common/Button';
import CompetitionInvitationCard from '../../CompetitionDashboard/CompetitionInvitationCard';
import { MessageItem } from '../../WaitingRoom/ChatBox';
import Slider from '../Slider';
import { SHARETEA_URL, THECUPS_URL, JOYTEA_URL } from '../../../constants';
import Router from 'next/router';

const Features = () => {
  const xagoeFeatureItems = [
    { id: 0, label: 'Sàn đấu' },
    { id: 1, label: 'Thách đấu' },
    { id: 2, label: 'Thử thách' },
    { id: 3, label: 'Giao bài tập *' },
    { id: 4, label: 'Phần thưởng *' }
  ];
  const [xagoeFeatureIdx, setXagoeFeatureIdx] = useState(0);
  const handleSelectXagoeFeature = (index) => {
    setXagoeFeatureIdx(index);
  };

  const [battleFeatureIdx, setBattleFeatureIdx] = useState(0);
  const battleTimeoutRef = useRef(null);
  useEffect(() => {
    clearTimeout(battleTimeoutRef.current);
    battleTimeoutRef.current = setTimeout(() => {
      const newIdx = battleFeatureIdx === 3 ? 0 : battleFeatureIdx + 1;
      setBattleFeatureIdx(newIdx);
    }, 4000);
  }, [battleFeatureIdx]);
  const handleSelectBattleIdx = (idx) => {
    setBattleFeatureIdx(idx);
  };

  const [competitionFeatureIdx, setCompetitionFeatureIdx] = useState(0);
  const competitionTimeoutRef = useRef(null);
  useEffect(() => {
    clearTimeout(competitionTimeoutRef.current);
    competitionTimeoutRef.current = setTimeout(() => {
      const newIdx =
        competitionFeatureIdx === 3 ? 0 : competitionFeatureIdx + 1;
      setCompetitionFeatureIdx(newIdx);
    }, 4000);
  }, [competitionFeatureIdx]);
  const handleSelectCompetitionIdx = (idx) => {
    setCompetitionFeatureIdx(idx);
  };

  const [challengeFeatureIdx, setChallengeFeatureIdx] = useState(0);
  const challengeTimeoutRef = useRef(null);
  useEffect(() => {
    clearTimeout(challengeTimeoutRef.current);
    challengeTimeoutRef.current = setTimeout(() => {
      const newIdx = challengeFeatureIdx === 2 ? 0 : challengeFeatureIdx + 1;
      setChallengeFeatureIdx(newIdx);
    }, 4000);
  }, [challengeFeatureIdx]);
  const handleSelectChallengeIdx = (idx) => {
    setChallengeFeatureIdx(idx);
  };

  const [exercisesFeatureIdx, setExercisesFeatureIdx] = useState(0);
  const exercisesTimeoutRef = useRef(null);
  useEffect(() => {
    clearTimeout(exercisesTimeoutRef.current);
    exercisesTimeoutRef.current = setTimeout(() => {
      const newIdx = exercisesFeatureIdx === 3 ? 0 : exercisesFeatureIdx + 1;
      setExercisesFeatureIdx(newIdx);
    }, 4000);
  }, [exercisesFeatureIdx]);
  const handleSelectExercisesIdx = (idx) => {
    setExercisesFeatureIdx(idx);
  };

  return (
    <div className={cn(styles.featuresXagoe)} id="tinh-nang">
      <div className={cn('has-text-centered')}>
        <span className={cn(styles.titleOrange)}>
          Tính năng nổi bật của XAGOe
        </span>
      </div>
      <Gap size="24" />
      <Slider
        items={xagoeFeatureItems}
        currentIndex={xagoeFeatureIdx}
        onSelect={handleSelectXagoeFeature}
        variant="orange"
        spacing="large"
      ></Slider>
      <Gap size="40" />

      {xagoeFeatureIdx === 0 ? (
        <div className={cn('columns is-variable is-8-desktop')}>
          <div className={cn('column is-half')}>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-1.svg"
              selected={battleFeatureIdx === 0}
              id={0}
              onClick={handleSelectBattleIdx}
            >
              Thử thách bản thân với hàng ngàn câu hỏi trắc nghiệm học tập, câu
              hỏi IQ, kiến thức tổng quát ...
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-2.svg"
              selected={battleFeatureIdx === 1}
              id={1}
              onClick={handleSelectBattleIdx}
            >
              Trò chuyện, kết nối, giao lưu cùng bạn bè trên khắp Việt Nam​.
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-3.svg"
              selected={battleFeatureIdx === 2}
              id={2}
              onClick={handleSelectBattleIdx}
            >
              Ghi danh trên bảng vàng xếp hạng.​
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-4.svg"
              selected={battleFeatureIdx === 3}
              id={3}
              onClick={handleSelectBattleIdx}
            >
              Khẳng định trí tuệ và bản lĩnh của bản thân​.
            </ComponentType3>
            <Gap size="32" />
            <Button
              className={cn(styles.btnExploreBattle)}
              size="medium"
              secondary
              onClick={() => {
                Router.push('/login');
              }}
            >
              Khám phá tính năng Sàn đấu
            </Button>
          </div>
          <div className={cn('column is-half is-hidden-mobile')}>
            {battleFeatureIdx === 0 ? (
              <div
                key="battle-1"
                className={cn(
                  styles.battleCardsContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-battle-feature-1.png"
                  alt="battle-1"
                />
              </div>
            ) : battleFeatureIdx === 1 ? (
              <div
                key="battle-2"
                className={cn(
                  styles.chatContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <MessageItem
                  item={{
                    id: 1,
                    myId: 1,
                    userId: 3,
                    avatar: '/static/img/landingpage/user/img-phuc-bui.png',
                    displayName: 'Johnny',
                    content: 'Mọi người chuẩn bị chiến nhé!'
                  }}
                ></MessageItem>
                <MessageItem
                  item={{
                    id: 1,
                    myId: 1,
                    userId: 2,
                    displayName: 'Huy Nguyen',
                    content: 'Ok Johnny!'
                  }}
                  // classname={cn('animate__delay-1s')}
                ></MessageItem>
                <MessageItem
                  item={{
                    id: 1,
                    myId: 1,
                    userId: 1,
                    displayName: 'Johnny',
                    content: 'Ok Johnny!'
                  }}
                  myId={1}
                  // classname={cn(styles.myChatItem, 'animate__delay-2s')}
                ></MessageItem>
                <div
                  className={cn(
                    styles.wave,
                    'animate__animated animate__zoomIn animate__faster'
                    // 'animate__animated animate__zoomIn animate__faster animate__delay-3s'
                  )}
                >
                  <span className={cn(styles.dot)}></span>
                  <span className={cn(styles.dot)}></span>
                  <span className={cn(styles.dot)}></span>
                </div>
              </div>
            ) : battleFeatureIdx === 2 ? (
              <div
                key="battle-3"
                className={cn(
                  styles.battleRankContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-battle-feature-3.png"
                  alt="battle-3"
                />
              </div>
            ) : (
              <div
                key="battle-4"
                className={cn(
                  styles.battleKnowledgeContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-battle-feature-4.png"
                  alt="battle-4"
                />
              </div>
            )}
          </div>
        </div>
      ) : xagoeFeatureIdx === 1 ? (
        <div className={cn('columns is-variable is-8-desktop')}>
          <div className={cn('column is-half is-hidden-mobile')}>
            {competitionFeatureIdx === 0 ? (
              <div
                key="competition-1"
                className={cn(
                  styles.competitionConfigContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-competition-feature-1.svg"
                  alt="config"
                />
              </div>
            ) : competitionFeatureIdx === 1 ? (
              <div
                key="competition-2"
                className={cn(
                  styles.invitationCardContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <CompetitionInvitationCard
                  data={{
                    competition: {
                      level: 'easy',
                      participants: [
                        {
                          userId: 3,

                          avatar:
                            '/static/img/landingpage/user/img-loc-tran.png',
                          displayName: 'Loc Tran'
                        },
                        {
                          userId: 4,
                          displayName: 'Huy Nguyen'
                        },
                        {
                          userId: 5,
                          avatar: '/static/img/landingpage/user/img-quy-ho.png',
                          displayName: 'Quy Ho'
                        }
                      ],
                      createdById: 3,
                      durationInSeconds: 900,
                      totalQuestions: 10,
                      bet: 100,
                      subject: 'math',
                      grade: 12
                    }
                  }}
                  onAcceptClick={() => {}}
                  onDeclineClick={() => {}}
                  onMouseChange={() => {}}
                  className={cn(styles.invitationCard)}
                  showFull
                ></CompetitionInvitationCard>
                <CompetitionInvitationCard
                  data={{
                    competition: {
                      level: 'medium',
                      participants: [
                        { userId: 3, displayName: 'Khoa Nguyen' },
                        {
                          userId: 4,
                          displayName: 'Ly Le'
                        },
                        {
                          userId: 5,
                          avatar:
                            '/static/img/landingpage/user/img-huong-ho.png',
                          displayName: 'Huong Ho'
                        }
                      ],
                      createdById: 5,
                      durationInSeconds: 1800,
                      totalQuestions: 20,
                      bet: 200,
                      subject: 'physics',
                      grade: 11
                    }
                  }}
                  onAcceptClick={() => {}}
                  onDeclineClick={() => {}}
                  onMouseChange={() => {}}
                  className={cn(styles.invitationCard)}
                ></CompetitionInvitationCard>
                <CompetitionInvitationCard
                  data={{
                    competition: {
                      level: 'hard',
                      participants: [
                        { userId: 3, displayName: 'Thuy Dinh' },
                        {
                          userId: 4,
                          avatar:
                            '/static/img/landingpage/user/img-thuy-dinh.png',
                          displayName: 'Thuy Dinh'
                        },
                        {
                          userId: 5,
                          avatar:
                            '/static/img/landingpage/user/img-thao-nguyen.png',
                          displayName: 'Thao Nguyen'
                        }
                      ],
                      createdById: 4,
                      durationInSeconds: 5400,
                      totalQuestions: 40,
                      bet: 200,
                      subject: 'english',
                      grade: 10
                    }
                  }}
                  onAcceptClick={() => {}}
                  onDeclineClick={() => {}}
                  onMouseChange={() => {}}
                  className={cn(styles.invitationCard)}
                ></CompetitionInvitationCard>
              </div>
            ) : competitionFeatureIdx === 2 ? (
              <div
                key="competition-3"
                className={cn(
                  styles.competitionRankContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-competition-feature-3.png"
                  alt="competition-3"
                />
              </div>
            ) : (
              <div
                key="competition-4"
                className={cn(
                  styles.competitionBetContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-competition-feature-4.png"
                  alt="competition-4"
                />
              </div>
            )}
          </div>
          <div className={cn('column is-half')}>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-5.svg"
              selected={competitionFeatureIdx === 0}
              id={0}
              onClick={handleSelectCompetitionIdx}
            >
              Tự tạo cuộc thách đấu của riêng mình bằng cách chọn: Chủ đề môn
              học; Lớp; Mức độ khó/dễ; Số lượng câu hỏi; Thời gian.
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-6.svg"
              selected={competitionFeatureIdx === 1}
              id={1}
              onClick={handleSelectCompetitionIdx}
            >
              Mời bạn bè tham dự và thi đấu theo thời gian thực. Tuỳ chọn thời
              lượng thi đấu và môn học yêu thích.
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-3.svg"
              selected={competitionFeatureIdx === 2}
              id={2}
              onClick={handleSelectCompetitionIdx}
            >
              Xem tiến trình và kết quả thi đấu của mình và bạn bè trên bảng xếp
              hạng.
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-8.svg"
              selected={competitionFeatureIdx === 3}
              id={3}
              onClick={handleSelectCompetitionIdx}
            >
              Đặt cược điểm gay cấn, chiến thắng và mang về nhiều phần quà hấp
              dẫn​.
            </ComponentType3>
            <Gap size="32" />
            <Button
              className={cn(styles.btnExploreBattle)}
              size="medium"
              secondary
              onClick={() => {
                Router.push('/login');
              }}
            >
              Khám phá tính năng Thách đấu
            </Button>
          </div>
        </div>
      ) : xagoeFeatureIdx === 2 ? (
        <div className={cn('columns is-variable is-8-desktop')}>
          <div className={cn('column is-half')}>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-9.svg"
              selected={challengeFeatureIdx === 0}
              id={0}
              onClick={handleSelectChallengeIdx}
            >
              Luyện tập và ôn tập kiến thức thật thú vị với gói câu hỏi đa dạng
              theo các môn học: Toán, Lý, Anh, Sinh, Sử, Địa ... từ lớp 10 đến
              lớp 12​.
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-10.svg"
              selected={challengeFeatureIdx === 1}
              id={1}
              onClick={handleSelectChallengeIdx}
            >
              Vượt qua thử thách để nhận điểm thưởng và mở khoá cấp độ tiếp
              theo.​
            </ComponentType3>
            <ComponentType3
              imgUrl="/static/img/icons/icon-landing-feature-11.svg"
              selected={challengeFeatureIdx === 2}
              id={2}
              onClick={handleSelectChallengeIdx}
            >
              Tăng kiến thức và nhận thêm nhiều điểm thưởng đổi quà hấp dẫn.
            </ComponentType3>

            <Gap size="32" />
            <Button
              className={cn(styles.btnExploreBattle)}
              size="medium"
              secondary
              onClick={() => {
                Router.push('/login');
              }}
            >
              Khám phá tính năng Thử thách
            </Button>
          </div>
          <div className={cn('column is-half is-hidden-mobile')}>
            {challengeFeatureIdx === 0 ? (
              <div
                key="challenge-1"
                className={cn(
                  styles.challengeFeature1Container,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-challenge-feature-1.png"
                  alt="challenge-1"
                />
              </div>
            ) : challengeFeatureIdx === 1 ? (
              <div
                key="challenge-2"
                className={cn(
                  styles.challengeInfoContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-challenge-feature-2.png"
                  alt="challenge-2"
                />
              </div>
            ) : (
              <div
                key="challenge-3"
                className={cn(
                  styles.challengeRewardContainer,
                  'animate__animated animate__fadeIn'
                )}
              >
                <img
                  src="/static/img/landingpage/img-landing-challenge-feature-3.png"
                  alt="challenge-3"
                />
              </div>
            )}
          </div>
        </div>
      ) : xagoeFeatureIdx === 3 ? (
        <>
          <div className={cn(styles.nextFeature)}>
            <span>* Tính năng sắp được ra mắt trong thời gian tới</span>
          </div>
          <div className={cn('columns is-variable is-8-desktop')}>
            <div className={cn('column is-half')}>
              <ComponentType3
                imgUrl="/static/img/icons/icon-landing-feature-12.svg"
                selected={exercisesFeatureIdx === 0}
                id={0}
                onClick={handleSelectExercisesIdx}
              >
                Giáo viên có thể tạo ra bộ bài tập, câu hỏi của riêng mình hoặc
                từ hệ thống dữ liệu của XAGOe.
              </ComponentType3>
              <ComponentType3
                imgUrl="/static/img/icons/icon-landing-feature-13.svg"
                selected={exercisesFeatureIdx === 1}
                id={1}
                onClick={handleSelectExercisesIdx}
              >
                Đặt thời gian làm bài theo thời gian thực hoặc cho phép học sinh
                làm theo thời gian tự do.
              </ComponentType3>
              <ComponentType3
                imgUrl="/static/img/icons/icon-landing-feature-14.svg"
                selected={exercisesFeatureIdx === 2}
                id={2}
                onClick={handleSelectExercisesIdx}
              >
                Kiểm tra kết quả làm bài của học sinh, xem được dữ liệu các câu
                hỏi nào học sinh hay trả lời sai nhất và học sinh nào gặp nhiều
                vấn đề nhất khi làm bài để xây dựng các phương án giảng dạy được
                tốt nhất.
              </ComponentType3>
              <ComponentType3
                imgUrl="/static/img/icons/icon-landing-feature-15.svg"
                selected={exercisesFeatureIdx === 3}
                id={3}
                onClick={handleSelectExercisesIdx}
              >
                Tăng cường sự tham gia và học tập chủ động từ học sinh. Thêm vào
                đó, giúp tăng sự hiểu biết của học sinh về chủ đề môn học, bài
                giảng.
              </ComponentType3>
            </div>
            <div className={cn('column is-half is-hidden-mobile')}>
              {exercisesFeatureIdx === 0 ? (
                <div
                  key="exercises-1"
                  className={cn(
                    styles.exercises1Container,
                    'animate__animated animate__fadeIn'
                  )}
                >
                  <img
                    src="/static/img/landingpage/img-landing-exercises-feature-1.png"
                    alt="exercises-1"
                  />
                </div>
              ) : exercisesFeatureIdx === 1 ? (
                <div
                  key="exercises-2"
                  className={cn(
                    styles.exercises2Container,
                    'animate__animated animate__fadeIn'
                  )}
                >
                  <img
                    src="/static/img/landingpage/img-landing-exercises-feature-2.png"
                    alt="exercises-2"
                  />
                </div>
              ) : exercisesFeatureIdx === 2 ? (
                <div
                  key="exercises-3"
                  className={cn(
                    styles.exercises3Container,
                    'animate__animated animate__fadeIn'
                  )}
                >
                  <img
                    src="/static/img/landingpage/img-landing-exercises-feature-3.png"
                    alt="exercises-3"
                  />
                </div>
              ) : (
                <div
                  key="exercises-4"
                  className={cn(
                    styles.exercises4Container,
                    'animate__animated animate__fadeIn'
                  )}
                >
                  <img
                    src="/static/img/landingpage/img-landing-exercises-feature-4.png"
                    alt="exercises-4"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cn(styles.nextFeature)}>
            <span>* Tính năng sắp được ra mắt trong thời gian tới</span>
          </div>
          <div
            className={cn(
              'columns is-variable is-8-desktop',
              styles.rewardContainer
            )}
          >
            <div className={cn('column is-half')}>
              <h2 className={cn(styles.title)}>Phần thưởng XAGOe là gì?</h2>
              <img
                className={cn(styles.gift)}
                src="/static/img/rewards/img-rewards-gift.png"
                alt="gift"
              />
              <p className={cn(styles.decs)}>
                Là tính năng hoàn toàn mới, cho phép bạn đổi điểm thưởng tích
                được từ việc chiến thắng và vượt qua các thử thách tại XAGOe.
                Bạn có thể quy đổi điểm thưởng của mình để nhận các phiếu quà
                tặng miễn phí hoặc giảm giá, cùng với các ưu đãi khác từ các đối
                tác của XAGOe.
              </p>
            </div>
            <div className={cn('column is-half')}>
              <h2 className={cn(styles.title)}>
                Các đối tác dịch vụ của chúng tôi
              </h2>
              <div className={cn(styles.partnersContainer)}>
                <img
                  className={cn(styles.sharetea)}
                  src="/static/img/rewards/img-partner-sharetea.png"
                  alt="sharetea"
                />

                <img
                  className={cn(styles.cupscoffee)}
                  src="/static/img/rewards/img-partner-cupscoffee.png"
                  alt="cupscoffee"
                />
                <img
                  className={cn(styles.joy)}
                  src="/static/img/rewards/img-partner-joy.png"
                  alt="joy"
                />
              </div>

              <h2 className={cn(styles.title)}>
                Trở thành đối tác của chúng tôi?
              </h2>
              <a href="mailto:info@xagoe.com" className={cn(styles.contact)}>
                Liên hệ ngay
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Gap = ({ size }) => {
  return <div style={{ marginBottom: size + 'px' }}></div>;
};

const ComponentType3 = ({ imgUrl, children, selected, onClick, id }) => {
  return (
    <div
      onClick={() => {
        onClick(id);
      }}
      className={cn(styles.type3Container, { [styles.active]: selected })}
    >
      <img src={imgUrl} alt="item" />
      <p>{children}</p>
    </div>
  );
};

export default Features;
