import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const RewardsDashboard = () => {
  return (
    <div className={cn(styles.rewardsContainer)}>
      <div className={cn(styles.container)}>
        <div
          className={cn(
            'columns is-variable is-8-desktop',
            styles.contentContainer
          )}
        >
          <div className={cn('column is-half')}>
            <div className={styles.contentContainer}>
              <div className={cn(styles.titleBackground)}></div>
              <h2 className={cn(styles.title)}>
                Khuyến mãi dành cho thành viên mới <br />
                NHẬN NGAY VOUCHER
              </h2>

              <div className={cn(styles.voucher)}>
                <img
                  src="/static/img/rewards/img-rewards-voucher.svg"
                  alt="voucher"
                />
              </div>
            </div>
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

            <div className={cn(styles.contactUs)}>
              <h2 className={cn(styles.title)}>
                Trở thành đối tác của chúng tôi?
              </h2>
              <a href="mailto:info@xagoe.com" className={cn(styles.contact)}>
                Liên hệ ngay
              </a>
            </div>

            <h2 className={cn(styles.title)}>Phần thưởng XAGOe là gì?</h2>
            <img
              className={cn(styles.gift)}
              src="/static/img/rewards/img-rewards-gift.png"
              alt="gift"
            />
            <p className={cn(styles.decs)}>
              Là tính năng hoàn toàn mới, cho phép bạn đổi điểm thưởng tích được
              từ việc chiến thắng và vượt qua các thử thách tại XAGOe. Bạn có
              thể quy đổi điểm thưởng của mình để nhận các phiếu quà tặng miễn
              phí hoặc giảm giá, cùng với các ưu đãi khác từ các đối tác của
              XAGOe.
            </p>
            <p className={cn(styles.highlight)}>
              * Tính năng sẽ sớm được ra mắt trong thời gian tới!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboard;
