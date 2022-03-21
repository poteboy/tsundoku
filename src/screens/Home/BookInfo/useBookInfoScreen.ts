import { useTabContext } from '@src/navigation/context';
import React, { useCallback, useState } from 'react';
import { collectionPath, firestore as db } from '@src/constants';
import { Book, Review, BookInfo } from '@src/entities';
import { Model } from '@src/util';

const userRef = db.collection(collectionPath.users.users);
const bookInfoRef = db.collection(collectionPath.bookInfos.bookInfos);
export const useBookInfoScreen = () => {
  const {
    user: { uid },
    userDocRef,
  } = useTabContext();
  const [loadingCheck, setLoadingCheck] = useState(false);

  const checkAndCreate = useCallback(async (bookInfo: BookInfo) => {
    setLoadingCheck(true);
    const bookInfoDoc = bookInfoRef.doc(bookInfo.uid);
    const reviewModel = new Model().model;
    const bookModel = new Model().model;
    const review: Review = {
      ...reviewModel,
      userRef: userDocRef,
    };
    const reviewDoc = bookInfoDoc
      .collection(collectionPath.bookInfos.reviews)
      .doc(review.uid);
    const book: Book = {
      ...bookModel,
      bookInfoRef: bookInfoDoc,
    };
    const bookDoc = userRef
      .doc(uid)
      .collection(collectionPath.users.books)
      .doc(book.uid);

    try {
      await db.runTransaction(async transaction => {
        const _doc = await transaction.get(bookInfoDoc);
        if (!_doc.exists) {
          await transaction.set(bookInfoDoc, bookInfo);
        }
        await transaction.set(reviewDoc, review);
        await transaction.set(bookDoc, book);
      });
    } catch {
      throw new Error('error');
    }
    setLoadingCheck(false);
  }, []);

  const checkAlreadyRegistered = useCallback(async () => {
    return true;
  }, []);

  return { checkAndCreate, loadingCheck };
};
