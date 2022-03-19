import { useCallback, useEffect, useState } from 'react';
import { BookInfo, isBookInfo, isBook, Book } from '@src/entities';
import { useContainer, createContainer } from 'unstated-next';
import { useAuth } from '..';
import { useTabContext } from '@src/navigation/context';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore as db, collectionPath } from '@src/constants';
import _ from 'underscore';
import { unstable_batchedUpdates } from 'react-native';

const userRef = db.collection(collectionPath.users.users);
const container = () => {
  const {
    user: { uid: userUid },
  } = useTabContext();
  const [books, setBooks] = useState<Book[]>([]);
  const [bookInfos, setBookInfos] = useState<BookInfo[]>([]);
  const [loadingBookInfo, setLoadingBookInfo] = useState(false);
  const [fetching, setFetching] = useState(false);

  async function fetchBookInfos(arr: Book[]) {
    return (
      await Promise.all(
        arr.map(async v => {
          const ref = v.bookInfoRef;
          const data = await (await ref.get()).data();
          if (isBookInfo(data)) return data;
        }),
      )
    ).filter(info => !!info) as BookInfo[];
  }

  const fetchBookOnLoad = async () => {
    setFetching(true);
    const arr: Book[] = [];
    await userRef
      .doc(userUid)
      .collection(collectionPath.users.books)
      .get()
      .then(async snapShot => {
        snapShot.forEach(async snap => {
          const _book = await snap.data();
          if (isBook(_book)) arr.push(_book);
        });
      })
      .catch(() => {
        throw new Error();
      })
      .finally(() => {
        arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        if (!_.isEqual(arr, books)) {
          unstable_batchedUpdates(() => {
            setBooks(arr);
            fetchBookInfos(arr).then(b => setBookInfos(b));
          });
        }
        setFetching(false);
      });
  };

  return { bookInfos, loadingBookInfo, fetchBookOnLoad, fetching, books };
};

export const BookInfoContainer = createContainer(container);

export const useBookInfo = () => useContainer(BookInfoContainer);
