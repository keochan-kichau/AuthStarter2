// firebase/firebaseConfig.ts
// Config của bạn từ Firebase Console

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCQ5IoWPguHjSAZU0ly3-pqbsYmakOJpO0',
  authDomain: 'authstarter-neuralnova3.firebaseapp.com',
  projectId: 'authstarter-neuralnova3',
  storageBucket: 'authstarter-neuralnova3.firebasestorage.app',
  messagingSenderId: '761004790268',
  appId: '1:761004790268:web:2366428ccbffb1dcc72279',
  measurementId: 'G-V6HZ22Z1J3',
};

// Khởi tạo app
const app = initializeApp(firebaseConfig);

// Auth đơn giản (không custom persistence React Native)
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);
