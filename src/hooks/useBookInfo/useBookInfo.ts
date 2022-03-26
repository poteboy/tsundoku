import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  isBook,
  Book,
  isBooksEqual,
  BookInfo,
  isBookInfo,
  BookSet,
  isBookSet,
} from '@src/entities';
import { useContainer, createContainer } from 'unstated-next';
import { useAuth } from '..';
import { useTabContext } from '@src/navigation/context';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore as db, collectionPath } from '@src/constants';
import { unstable_batchedUpdates } from 'react-native';
import { convertDate } from '@src/util';

const bookInfoRef = db.collection(collectionPath.bookInfos.bookInfos);

const userRef = db.collection(collectionPath.users.users);
const container = () => {
  const {
    user: { uid: userUid },
  } = useTabContext();
  const [bookInfos, setBookInfos] = useState<BookInfo[]>([]);
  const [loadingBookInfo, setLoadingBookInfo] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [_books, loading, error] = useCollectionData<Book>(
    userRef.doc(userUid).collection(collectionPath.users.books),
  );
  const books = useMemo(() => {
    return _books ?? [];
  }, [_books]);

  const bookSets: BookSet[] = useMemo(() => {
    return books
      .map(book => {
        const bookInfo = bookInfos.find(
          info => bookInfoRef.doc(info.uid).path === book.bookInfoRef.path,
        );
        return bookInfo
          ? {
              book,
              bookInfo,
            }
          : undefined;
      })
      .filter(isBookSet) as BookSet[];
  }, [books, bookInfos]);

  const fetchBookInfos = useCallback(async (arr: Book[]) => {
    return (
      await Promise.all(
        arr.map(async v => {
          const ref = v.bookInfoRef;
          const data = await (await ref.get()).data();
          console.log('data');
          if (isBookInfo(data)) return data;
        }),
      )
    ).filter(isBookInfo) as BookInfo[];
  }, []);

  useEffect(() => {
    fetchBookInfos(books).then(info => setBookInfos(info));
  }, [books]);

  return {
    bookInfos,
    loadingBookInfo,
    fetching,
    books,
    bookSets,
  };
};

export const BookInfoContainer = createContainer(container);

export const useBookInfo = () => useContainer(BookInfoContainer);
