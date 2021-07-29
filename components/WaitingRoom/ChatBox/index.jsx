import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import Avatar from '../../Common/Avatar';
import Input from '../../Common/Input';

/**
 * @param data - messages array
 * @param myId - current User ID
 * @param onSend - function when user enter to submit a message
 */
const ChatBox = ({ data, onSend, myId, disabled, animationOff }) => {
  const [messages, setMessages] = useState(data);
  const messagesContentRef = useRef(null);
  const [firstScroll, setFirstScroll] = useState(false);

  const scrollToBottom = () => {
    messagesContentRef.current &&
      messagesContentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const maxTextLength = 200;
  const [text, setText] = useState('');

  const onTextChange = (e) => {
    const value = e.target.value;
    if (value.length > maxTextLength) {
      return;
    }
    setText(value);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter' && text) {
      if (text.trim().length > 0) {
        onSend && onSend(text);
        setText('');
      }
    }
  };

  const Placeholder = (
    <div>
      <div className={cn(styles.itemPlaceholder, styles.holder1)}></div>
      <div className={cn(styles.itemPlaceholder, styles.holder2)}></div>
      <div className={cn(styles.itemPlaceholder, styles.holder3)}></div>
      <p
        className={cn(
          'text-is-14 has-text-weight-bold has-text-centered has-margin-top-5 has-padding-left-4 has-padding-right-4',
          styles.textGradient
        )}
      >
        Hãy bắt đầu cuộc trò chuyện với mọi người nào!
      </p>
    </div>
  );

  useEffect(() => {
    setMessages(data);
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {messages.length === 0 && Placeholder}
        {messages.map((x) => (
          <MessageItem
            key={`${x.id}`}
            item={{ ...x, myId }}
            myId={myId}
            animationOff={animationOff}
          />
        ))}
        <div ref={messagesContentRef}></div>
      </div>
      <div className={styles.footer}>
        <Input
          value={text}
          className={styles.input}
          onValueChange={onTextChange}
          placeholder="Nhấn enter để gửi tin nhắn..."
          onKeyUp={onKeyUp}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export const MessageItem = ({
  item,
  myId,
  animationOff,
  classname,
  ...props
}) => {
  return (
    <div key={item.id} className="has-margin-bottom-4">
      <div
        className={cn(
          classname,
          styles.messageItem,
          item.myId !== item.userId && styles.others,
          !animationOff && 'animate__animated animate__zoomIn animate__faster',
          { ...props }
        )}
      >
        {item.userId !== myId && (
          <div
            className={cn(
              'is-flex has-item-center has-margin-bottom-3',
              styles.header
            )}
          >
            <Avatar
              url={item.avatar}
              size="small"
              className={styles.avatar}
              displayName={item.displayName}
            />
            <p className="text-is-16 is-family-secondary has-margin-left-3 has-text-weight-bold has has-text-grey-darker">
              {item.displayName}
            </p>
          </div>
        )}
        <p className="text-is-14 has-text-weight-bold has has-text-grey-dark">
          {item.content}
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
