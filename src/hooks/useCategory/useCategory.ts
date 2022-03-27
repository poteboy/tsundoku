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
import {
  firestore as db,
  collectionPath,
  DocumentReference,
} from '@src/constants';
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

  const getBookFromRef = useCallback(
    (ref: DocumentReference): BookSet => {
      const set = bookSets.find(set => {
        return getBookRef(user.uid).doc(set.book.uid).path === ref.path;
      });
      // 必ず存在する
      return set as BookSet;
    },
    [bookSets],
  );

  const addBookRefsToCategory = useCallback(
    async (refs: DocumentReference[], category: Category) => {
      const tmp = removeDup([...category.bookRefs, ...refs]);
      category.bookRefs = tmp;
      const doc = getCategoryRef(user.uid).doc(category.uid);
      try {
        await db.runTransaction(async transaction => {
          await transaction.update(doc, category);
        });
      } catch {
        throw new Error();
      }
    },
    [],
  );

  return {
    getBookFromRef,
    generateNewCategory,
    categories,
    addBookRefsToCategory,
  };
};

const removeDup = (refs: DocumentReference[]) => {
  const vals: DocumentReference[] = [];
  refs.map(ref => {
    if (vals.some(val => val.id === ref.id)) return;
    vals.push(ref);
  });
  return vals;
};
