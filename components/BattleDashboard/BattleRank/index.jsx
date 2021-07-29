import React, { useState } from 'react';
import cn from 'classnames';
import SimpleUserCard from '../../../components/Common/SimpleUserCard';
import styles from './styles.module.scss';
import Dropdown from 'react-dropdown';
import _ from 'lodash';
import Router from 'next/router';
import { useEffect } from 'react';
import { User } from '../../../hooks/useUser';
import { getBattleRank } from '../../../services/battle';
import { handleError } from '../../../utils';
import { DEFAULT_GRADE, ALLOWED_GRADE_ARRAY } from '../../../constants';

const BattleRank = ({ animationOff }) => {
  const { user } = User.useContainer();

  const [loading, setLoading] = useState(true);
  const [rankGrade, setRankGrade] = useState(0);
  useEffect(() => {
    const gradeId = user.grade?.name ?? DEFAULT_GRADE;
    setRankGrade(gradeId);
  }, [user, setRankGrade]);

  const [userId, setUserId] = useState(user?.id);
  useEffect(() => {
    setUserId(user?.id);
  }, [user, setUserId]);

  const grades = ALLOWED_GRADE_ARRAY.map((x) => ({
    value: `${x}`,
    label: `Lớp ${x}`
  }));

  const [usersRank, setUsersRank] = useState([]);
  const handleGetBattleRank = async (rankGrade) => {
    try {
      const res = await getBattleRank({
        gradeId: rankGrade
      });
      setUsersRank(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (rankGrade !== 0) {
      setLoading(true);
      setUsersRank([]);
      handleGetBattleRank(rankGrade);
    }
  }, [rankGrade]);

  const getAchievement = (data) => {
    if (data.countOrder1 !== '0') return `Đứng nhất ${data.countOrder1} lần`;
    else if (data.countOrder2 !== '0')
      return `Đứng nhì ${data.countOrder2} lần`;
    else if (data.countOrder3 !== '0') return `Đứng ba ${data.countOrder3} lần`;
    else if (data.countOrder4 !== '0') return `Đứng tư ${data.countOrder4} lần`;
    else if (data.countOrder5 !== '0')
      return `Đứng năm ${data.countOrder5} lần`;

    return '';
  };

  // Order rank && generate message
  // const orderedRank = _.orderBy(
  //   usersRank,
  //   (x) => [
  //     parseInt(x.countOrder1),
  //     parseInt(x.countOrder2),
  //     parseInt(x.countOrder3),
  //     parseInt(x.countOrder4),
  //     parseInt(x.countOrder5)
  //   ],
  //   ['desc', 'desc', 'desc', 'desc', 'desc']
  // ).map((x) => ({
  //   ...x,
  //   achievement: getAchievement(x)
  // }));

  const orderedRank =
    usersRank &&
    usersRank.map((x) => ({
      ...x,
      achievement: getAchievement(x)
    }));

  const handleNavigateUser = (userId) => {
    Router.push(`/profile/${userId}`);
  };

  return (
    <div className="">
      <div className="has-margin-bottom-3"></div>
      <div className="is-family-secondary text-is-20 has-text-weight-bold has-margin-bottom-3 has-text-grey-darker has-text-centered">
        BẢNG XẾP HẠNG:
      </div>
      <p className="has-text-weight-bold has-text-centered text-is-16 has-text-grey">
        Top 5 nhà vô địch sàn đấu XAGOe
      </p>
      <Dropdown
        className={styles.dropdown}
        controlClassName={styles.dropdownControl}
        menuClassName={styles.menuDropdown}
        options={grades}
        onChange={(grade) => setRankGrade(grade.value)}
        value={rankGrade}
      />
      <div
        className={cn(styles.rankContainer, {
          [styles.animationOff]: animationOff
        })}
      >
        {!loading && orderedRank?.length === 0 && (
          <div
            className={cn(
              'has-text-centered has-text-weight-medium text-is-14 animate__animated animate__fadeIn'
            )}
          >
            Hãy nhanh tay chinh phục sàn đấu và trở thành một trong những người
            đầu tiên được vinh danh trên bảng xếp hạng XAGOe bạn nhé!
          </div>
        )}
        {orderedRank?.map((simpleUser, index) => (
          <div
            key={simpleUser.userId}
            className={cn(styles.rank, 'has-text-weight-bold')}
          >
            <div
              style={{ animationDelay: `${index * 100}ms` }}
              className={cn(styles.position, styles[`pos${index + 1}`])}
            >
              {index + 1}
            </div>
            <div
              className={cn(styles.userInfo)}
              style={{
                width: '100%',
                animationDelay: `${(index + orderedRank.length * 1.5) * 100}ms`
              }}
            >
              <SimpleUserCard
                className={cn(styles.userCard)}
                isMySelf={simpleUser.userId === userId}
                data={{ ...simpleUser, subtitle: simpleUser.achievement }}
                onClick={() => {
                  handleNavigateUser(simpleUser.userId);
                }}
                touchable
              ></SimpleUserCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleRank;
