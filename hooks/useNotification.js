import { useState } from 'react';
import createContainer from '.';
import firebase from '../services/firebase';

const useNotification = () => {
  const initialState = [];

  const [notifications, setNotifications] = useState(initialState);

  const removeNotificationFromFirebase = (userId, notificationId) => {
    firebase.database().ref(`users/${userId}/n/${notificationId}`).remove();
  };

  const markNotificationAsRead = (userId, notificationId) => {
    firebase.database().ref(`users/${userId}/n/${notificationId}/ir`).set(true);
  };

  const updateNotifications = (data) => {
    setNotifications(data);
  };

  return {
    notifications,
    updateNotifications,
    markNotificationAsRead,
    removeNotificationFromFirebase
  };
};

export const Notification = createContainer(useNotification);
