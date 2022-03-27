import React, { FC, useState } from 'react';
import { firestore as db, collectionPath } from '@src/constants/firebase';
import { BookInfo } from '@src/entities';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTabContext } from '@src/navigation/context';
import { useAuth } from '..';

const userRef = db.collection(collectionPath.users.users);
export const useContext = () => {
  const { userUid } = useAuth();

  const [books, loading, error] = useCollectionData(
    userRef.doc(userUid).collection(collectionPath.users.books),
  );

  return { books };
};
