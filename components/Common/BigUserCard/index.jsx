import React from 'react';
import styles from './styles.module.scss';
import Button from '../Common/Button';

const BigUserCard = ({ data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <img src={data.avatar} className={styles.avatar} alt="user avatar" />
        <div className={styles.middleInfo}>
          <div className="is-flex has-item-center">
            <h1 className="text-is-24">{data.displayName}</h1>
            <span className="text-is-grey text-is-14 has-margin-left-3">
              @{data.username}
            </span>
          </div>
          <span>
            <i className="icon-case"></i>Lớp {data.grade}
          </span>
          <span>
            <i className="icon-home"></i>
            {data.school}
          </span>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.rightInfo}>
          <span>
            <i className="icon-pin"></i> {data.city}
          </span>
          <Button size="small" className="has-padding-x-5">
            THÊM BẠN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BigUserCard;
