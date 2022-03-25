import { useTabContext } from '@src/navigation/context';
import React, { useState, useCallback } from 'react';
import { firestore as db, collectionPath } from '@src/constants';
import { generateNewCategory } from '@src/entities';

const userRef = db.collection(collectionPath.users.users);
const getCategoryRef = (userUid: string) =>
  userRef.doc(userUid).collection(collectionPath.users.category);

export const useCategoryScreen = () => {
  const { user } = useTabContext();

  const [loadingCreateCategory, setLoadingCreateCategory] = useState(false);
  const createCategory = useCallback(async (name: string) => {
    setLoadingCreateCategory(true);
    const _category = generateNewCategory(name);
    try {
      await getCategoryRef(user.uid).doc(_category.uid).set(_category);
      return _category;
    } catch {
      throw new Error();
    } finally {
      setLoadingCreateCategory(false);
    }
  }, []);

  return { createCategory, loadingCreateCategory };
};
