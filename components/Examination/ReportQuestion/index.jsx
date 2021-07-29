import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import Coin from '../../Common/Coin';

const ReportQuestion = ({ isOpen, onClose, onReport }) => {
  const options = ['wrong_question_answer', 'answer_not_displayed', 'other'];
  const onSubmit = () => {
    const data = { category: options[option - 1], comment: reason };
    onReport(data);
    setOption(0);
    setReason('');
  };
  const [option, setOption] = useState(0);
  const [reason, setReason] = useState('');

  const onOtherReasonChange = (e) => {
    setReason(e.target.value);
    setOption(3);
    if (!e.target.value) {
      setOption(0);
    }
  };

  const onOptionClick = (option) => {
    setOption(option);
  };

  return (
    <>
      {isOpen && (
        <Modal
          contentClassName={styles.reportModal}
          onCloseModal={() => {
            onClose && onClose(false);
          }}
        >
          <div>
            <h4 className={styles.modalTitle}>BÁO CÂU HỎI LỖI</h4>
            <p className="text-is-14 has-margin-bottom-5">
              Rất xin lỗi, câu hỏi này bị lỗi gì vậy bạn?
            </p>
            <div className="has-margin-top-4 has-margin-bottom-4">
              <Button
                onClick={() => onOptionClick(1)}
                outline={option !== 1}
                className={[
                  option !== 1 ? styles.btnInactive : styles.btnActive
                ]}
              >
                Câu hỏi/đáp án bị sai
              </Button>
            </div>
            <div className="has-margin-top-4 has-margin-bottom-4">
              <Button
                onClick={() => onOptionClick(2)}
                outline={option !== 2}
                className={[
                  option !== 2 ? styles.btnInactive : styles.btnActive
                ]}
              >
                Đáp án không hiển thị
              </Button>
            </div>
            <p className="text-is-18 has-margin-top-4">Lý do khác?</p>
            <div>
              <textarea
                onChange={onOtherReasonChange}
                rows="4"
                maxLength="2000"
                value={reason}
                placeholder="Vui lòng điền lý do tại đây..."
              />
            </div>
            <div className="has-margin-bottom-5 has-margin-top-4">
              <Button
                onClick={onSubmit}
                className={styles.btnSubmit}
                outlineGradient
                disabled={option === 0}
                size="large"
              >
                BÁO LỖI
              </Button>
            </div>
            <p className="text-is-14 has-margin-top-4 has-text-weight-medium">
              Chúng mình sẽ kiểm duyệt cẩn thận và cập nhật lại câu hỏi nếu có
              lỗi xảy ra. Cảm ơn bạn đã chung tay phát triển XAGOe.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReportQuestion;
