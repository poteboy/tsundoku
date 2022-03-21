import { useCallback, useEffect, useState } from 'react';
import {
  isBook,
  Book,
  isBooksEqual,
  BookInfo,
  isBookInfo,
} from '@src/entities';
import { useContainer, createContainer } from 'unstated-next';
import { useAuth } from '..';
import { useTabContext } from '@src/navigation/context';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore as db, collectionPath } from '@src/constants';
import { unstable_batchedUpdates } from 'react-native';
import { convertDate } from '@src/util';

const userRef = db.collection(collectionPath.users.users);
const container = () => {
  const {
    user: { uid: userUid },
  } = useTabContext();
  const [books, setBooks] = useState<Book[]>([]);
  const [bookInfos, setBookInfos] = useState<BookInfo[]>([]);
  const [loadingBookInfo, setLoadingBookInfo] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchBookInfos = useCallback(async (arr: Book[]) => {
    return (
      await Promise.all(
        arr.map(async v => {
          const ref = v.bookInfoRef;
          const data = await (await ref.get()).data();
          if (isBookInfo(data)) return data;
        }),
      )
    ).filter(info => !!info) as BookInfo[];
  }, []);

  const fetchBookOnLoad = useCallback(async () => {
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
        books.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        // JSON.stringifyだと何故か無限ループに陥る
        if (!isBooksEqual(arr, books)) {
          console.log('change');
          unstable_batchedUpdates(() => {
            setBooks(arr);
            fetchBookInfos(arr).then(b => setBookInfos(b));
          });
        }
        setFetching(false);
      });
  }, [books]);

  return { bookInfos, loadingBookInfo, fetchBookOnLoad, fetching, books };
};

export const BookInfoContainer = createContainer(container);

export const useBookInfo = () => useContainer(BookInfoContainer);
