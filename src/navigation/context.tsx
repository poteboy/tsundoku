import React, { createContext, useContext } from 'react';
import { User, BookInfo } from '@src/entities';
import { DocumentReference, DocumentData } from '@src/constants';

// TODO user/bookにBookのrefを入れる
export const TabContext = createContext<{
  user: User;
  userDocRef: DocumentReference;
  bookInfos: BookInfo[];
}>({
  user: null as any,
  userDocRef: null as any,
  bookInfos: [],
});

export const useTabContext = () => useContext(TabContext);

// firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
