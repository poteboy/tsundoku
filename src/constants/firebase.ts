import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import * as db from 'firebase/firestore';
import {
  FIREBASE_API_KEY_DEV,
  FIREBASE_APP_ID_DEV,
  FIREBASE_AUTH_DOMAIN_DEV,
  FIREBASE_PROJECT_ID_DEV,
  FIREBASE_STORAGE_BUCKET_DEV,
  FIREBASE_MESSAGE_ID_DEV,
  FIREBASE_MEASUREMENT_ID_DEV,
} from '@env';

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY_DEV,
  authDomain: FIREBASE_AUTH_DOMAIN_DEV,
  projectId: FIREBASE_PROJECT_ID_DEV,
  storageBucket: FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: FIREBASE_MESSAGE_ID_DEV,
  appId: FIREBASE_APP_ID_DEV,
  measurementId: FIREBASE_MEASUREMENT_ID_DEV,
};

export const firebase = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
export const batch = db.writeBatch(firestore);
export * from 'firebase/firestore';

export const collections = {
  users: 'users',
} as const;
