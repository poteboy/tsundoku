import React, { useCallback, useState } from 'react';
import { firestore as db, collectionPath } from '@src/constants';
import { Book, Review, isReview, BookInfo } from '@src/entities';
import { useTabContext } from '@src/navigation/context';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

const userRef = db.collection(collectionPath.users.users);
const bookInfoRef = db.collection(collectionPath.bookInfos.bookInfos);
type Params = {
  book: Book;
  bookInfo: BookInfo;
};

export const useBookDetail = (params: Params) => {
  const {
    userDocRef,
    user: { uid },
  } = useTabContext();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { book, bookInfo } = params;

  const deleteBook = useCallback(async () => {
    setLoadingDelete(true);
    try {
      await db.runTransaction(async transaction => {
        const reviewDoc = await bookInfoRef
          .doc(bookInfo.uid)
          .collection(collectionPath.bookInfos.reviews)
          .where('userRef', '==', userDocRef)
          .limit(1)
          .get();
        const doc = await reviewDoc.docs[0].data();
        const review = isReview(doc) ? (doc as Review) : undefined;
        await transaction.delete(
          bookInfoRef
            .doc(bookInfo.uid)
            .collection(collectionPath.bookInfos.reviews)
            .doc(review?.uid),
        );
        await transaction.delete(
          userRef.doc(uid).collection(collectionPath.users.books).doc(book.uid),
        );
      });
    } catch (e) {
      throw new Error();
    }
    setLoadingDelete(false);
  }, []);

  return { deleteBook, loadingDelete };
};
