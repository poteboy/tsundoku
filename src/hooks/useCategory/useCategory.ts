import React, { useCallback, useMemo } from 'react';
import { BookSet, Category } from '@src/entities';
import { useBookInfo } from '@src/hooks';
import { useTabContext } from '@src/navigation/context';
import { firestore as db, collectionPath } from '@src/constants';
import { Model } from '@src/util/model';

const categoryRef = db.collection(collectionPath.users.category);
export const useCategory = () => {
  const { bookSets } = useBookInfo();
  const { user } = useTabContext();

  const preDefinedCategories: Category[] = useMemo(() => {
    return [
      {
        uid: 'ThisIsThePreDefinedCategoryForAll',
        createdAt: user.createdAt,
        active: user.active,
        name: 'すべて',
        bookSets,
      },
    ];
  }, [bookSets, user]);

  const createCategory = useCallback(async (name: string) => {
    const merge = new Model().mergeModel;
    const category = merge<Category>({
      name,
      bookSets: [],
    });
    console.log(category.uid);
    // try {
    //   await categoryRef.doc(category.uid).set(category);
    // } catch {
    //   throw new Error();
    // }
  }, []);

  const addSetToCategory = useCallback(async (bookSet: BookSet) => {
    await db.runTransaction(async transaction => {
      transaction;
    });
  }, []);

  return { preDefinedCategories, createCategory };
};
