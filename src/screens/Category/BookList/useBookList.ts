import React, { FC, useCallback, useState } from 'react';
import { firestore as db, collectionPath } from '@src/constants';
import { useTabContext } from '@src/navigation/context';
import { isCategory } from '@src/entities';

const getCategoyPath = (userUid: string) =>
  db
    .collection(collectionPath.users.users)
    .doc(userUid)
    .collection(collectionPath.users.category);
export const useBookList = () => {
  const { user } = useTabContext();
  const [loading, setLoading] = useState(false);

  const deleteCategory = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      await getCategoyPath(user.uid).doc(uid).delete();
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategory = async (uid: string) => {
    const data = await (await getCategoyPath(user.uid).doc(uid).get()).data();
    if (isCategory(data)) return data;
  };

  return {
    deleteCategory,
    getCategory,
  };
};
