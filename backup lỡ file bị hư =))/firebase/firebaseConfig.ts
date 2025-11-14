// firebase/firebaseConfig.ts
// TODO: thay bằng config của bạn ở Firebase Console

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCQ5IoWPguHjSAZU0ly3-pqbsYmakOJpO0',
  authDomain: 'authstarter-neuralnova3.firebaseapp.com',
  projectId: 'authstarter-neuralnova3',
  storageBucket: 'authstarter-neuralnova3.firebasestorage.app',
  messagingSenderId: '761004790268',
  appId: '1:761004790268:web:2366428ccbffb1dcc72279',
  measurementId: 'G-V6HZ22Z1J3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
