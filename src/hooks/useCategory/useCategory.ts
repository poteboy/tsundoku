import React, { useCallback, useMemo } from 'react';
import { BookSet, Category, BookSetRef } from '@src/entities';
import { useBookInfo } from '@src/hooks';
import { useTabContext } from '@src/navigation/context';
import { firestore as db, collectionPath } from '@src/constants';
import { Model } from '@src/util/model';

const categoryRef = db.collection(collectionPath.users.category);
const bookRef = db.collection(collectionPath.users.books);
const bookInfoRef = db.collection(collectionPath.bookInfos.bookInfos);
export const useCategory = () => {
  const { bookSets } = useBookInfo();
  const { user } = useTabContext();

  const bookSetRefs: BookSetRef[] = useMemo(() => {
    return bookSets.map(set => {
      const ref = {
        bookRef: bookRef.doc(set.book.uid),
        bookInfoRef: bookInfoRef.doc(set.bookInfo.uid),
      };
      return ref;
    });
  }, [bookSets]);

  const getBookSetFromRef = useCallback(
    (ref: BookSetRef): BookSet => {
      const set = bookSets.find(set => {
        return (
          bookRef.doc(set.book.uid).path === ref.bookRef.path &&
          bookInfoRef.doc(set.bookInfo.uid).path === ref.bookInfoRef.path
        );
      });
      // 必ず存在する
      return set as BookSet;
    },
    [bookSets],
  );

  const preDefinedCategories: Category[] = useMemo(() => {
    return [
      {
        uid: 'ThisIsThePreDefinedCategoryForAll',
        createdAt: user.createdAt,
        active: user.active,
        name: 'すべて',
        bookSetRefs,
      },
    ];
  }, [bookSets, user]);

  const createCategory = useCallback(async (name: string) => {
    const merge = new Model().mergeModel;
    const category = merge<Category>({
      name,
      bookSetRefs: [],
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

  return { preDefinedCategories, createCategory, getBookSetFromRef };
};
