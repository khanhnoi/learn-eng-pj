import firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};
export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
