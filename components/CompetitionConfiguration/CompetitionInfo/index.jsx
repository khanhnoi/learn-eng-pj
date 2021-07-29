import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Avatar from '../../Common/Avatar';
import StaticStepper from '../../Common/StaticStepper';

const CompetitionInfo = ({ users, totalBet }) => {
  const displayCount = 4;
  const extraAvatars = users.length - displayCount;

  useEffect(() => {}, []);

  const Bet = (
    <>
      <StaticStepper value={totalBet} isBet></StaticStepper>
    </>
  );

  return (
    <div>
      <div className="has-margin-bottom-4"></div>
      <p className="text-is-16 has-margin-bottom-3 has-text-grey has-text-centered has-text-weight-medium">
        Đối thủ:
      </p>
      <div className="is-flex has-justify-center">
        {users.slice(0, displayCount).map((u) => (
          <div
            className="is-inline-block has-margin-right-2"
            key={`avt-${u.id}`}
          >
            <Avatar url={u.avatar} size="small" displayName={u.displayName} />
          </div>
        ))}
        {users.length > displayCount && (
          <Avatar size="small" displayName={`+ ${extraAvatars}`} />
        )}
      </div>
      <div className="has-margin-top-5 has-text-centered">
        <p className="text-is-16 has-margin-bottom-4 has-text-grey has-text-centered has-text-weight-medium">
          Phần thưởng:
        </p>
        {Bet}
      </div>
    </div>
  );
};

export default CompetitionInfo;
