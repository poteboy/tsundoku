import { useCallback, useEffect, useState } from 'react';
import { BookInfo, isBookInfo, isBook, Book } from '@src/entities';
import { useContainer, createContainer } from 'unstated-next';
import { useAuth } from '..';
import { useTabContext } from '@src/navigation/context';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  firestore as db,
  collectionPath,
  DocumentReference,
} from '@src/constants';

const userRef = db.collection(collectionPath.users.users);
const container = () => {
  const {
    user: { uid: userUid },
  } = useTabContext();
  const [books, setBooks] = useState<Book[]>([]);
  const [bookInfos, setBookInfos] = useState<BookInfo[]>([]);
  const [loadingBookInfo, setLoadingBookInfo] = useState(false);
  const [fetching, setFetching] = useState(false);

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
      .finally(() => {
        setBooks(arr);
        setFetching(false);
      });
  };

  useEffect(() => {
    async function get() {
      return (await Promise.all(
        books.map(async v => {
          const ref = v.bookInfoRef;
          const data = await (await ref.get()).data();
          if (isBookInfo(data)) return data;
        }),
      )) as BookInfo[];
    }
    get().then(b => setBookInfos(b));
  }, [books]);

  return { bookInfos, loadingBookInfo, fetchBookOnLoad, fetching };
};

export const BookInfoContainer = createContainer(container);

export const useBookInfo = () => useContainer(BookInfoContainer);
