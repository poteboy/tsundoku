import React, { createContext, useContext } from 'react';
import { User } from '@src/entities';
import { DocumentReference, DocumentData } from '@src/constants';

// TODO user/bookにBookのrefを入れる
export const TabContext = createContext<{
  user: User;
  userDocRef: DocumentReference;
}>({
  user: null as any,
  userDocRef: null as any,
});

export const useTabContext = () => useContext(TabContext);

// firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
