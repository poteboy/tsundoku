import fb from 'firebase';
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

export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app();
firebase.firestore().settings({
  cacheSizeBytes: 10485760, // 10MB
  ignoreUndefinedProperties: true,
});
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const session = fb.auth.Auth.Persistence.LOCAL;

export const collectionPath = {
  users: {
    users: 'users',
    books: 'books',
  },
  bookInfos: {
    bookInfos: 'bookInfos',
    reviews: 'reviews',
  },
} as const;

// // user
// export const userRef = firestore.collection(collectionPath.users.users);
// export const bookRef = (userUid: string) =>
//   userRef.doc(userUid).collection(collectionPath.users.books.books);
// // bookInfo
// export const bookInfoRef = firestore.collection(
//   collectionPath.bookInfos.bookInfos,
// );

export type DocumentReference =
  fb.firestore.DocumentReference<fb.firestore.DocumentData>;
export type DocumentData = fb.firestore.DocumentData;

// fb.firestore.DocumentReference<fb.firestore.DocumentData>
