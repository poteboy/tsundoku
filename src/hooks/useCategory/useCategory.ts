import React, { useCallback, useMemo, useState } from 'react';
import {
  BookSet,
  isCategory,
  BookSetRef,
  generateNewCategory,
  Category,
} from '@src/entities';
import { useBookInfo } from '@src/hooks';
import { useTabContext } from '@src/navigation/context';
import { firestore as db, collectionPath } from '@src/constants';
import { Model } from '@src/util/model';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const userRef = db.collection(collectionPath.users.users);
const getCategoryRef = (userUid: string) =>
  userRef.doc(userUid).collection(collectionPath.users.category);
const getBookRef = (userUid: string) =>
  userRef.doc(userUid).collection(collectionPath.users.books);
const bookInfoRef = db.collection(collectionPath.bookInfos.bookInfos);
export const useCategory = () => {
  const { bookSets } = useBookInfo();
  const { user } = useTabContext();

  const [_categories, loading, error] = useCollectionData<Category[]>(
    getCategoryRef(user.uid),
  );

  const categories = useMemo(() => {
    const c: any = _categories ?? [];
    return c as Category[];
  }, [_categories]);

  const bookSetRefs: BookSetRef[] = useMemo(() => {
    return bookSets.map(set => {
      const ref = {
        bookRef: getBookRef(user.uid).doc(set.book.uid),
        bookInfoRef: bookInfoRef.doc(set.bookInfo.uid),
      };
      return ref;
    });
  }, [bookSets]);

  const getBookSetFromRef = useCallback(
    (ref: BookSetRef): BookSet => {
      const set = bookSets.find(set => {
        return (
          // bookRef.doc(set.book.uid).path === ref.bookRef.path &&
          bookInfoRef.doc(set.bookInfo.uid).path === ref.bookInfoRef.path
        );
      });
      // 必ず存在する
      return set as BookSet;
    },
    [bookSets],
  );

  const addSetToCategory = useCallback(async (bookSet: BookSet) => {
    await db.runTransaction(async transaction => {
      transaction;
    });
  }, []);

  return {
    getBookSetFromRef,
    generateNewCategory,
    categories,
  };
};
