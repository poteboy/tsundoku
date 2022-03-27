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
import {
  firestore as db,
  collectionPath,
  DocumentReference,
} from '@src/constants';
import { unstable_batchedUpdates } from 'react-native';
import { convertDate } from '@src/util';

const bookInfoRef = db.collection(collectionPath.bookInfos.bookInfos);

const userRef = db.collection(collectionPath.users.users);
const container = () => {
  const { userUid } = useAuth();

  const [bookInfos, setBookInfos] = useState<BookInfo[]>([]);
  const [loadingBookInfo, setLoadingBookInfo] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [_books, loading, error] = useCollectionData<Book>(
    userRef.doc(userUid).collection(collectionPath.users.books),
  );
  const books = useMemo(() => {
    const b = _books ?? [];
    return b as any as Book[];
  }, [_books]);

  const bookDictionary = useMemo(() => {
    const a: Dictionary<BookSet> = {};
    books.map(book => {
      const bookInfo = bookInfos.find(
        info => bookInfoRef.doc(info.uid).path === book.bookInfoRef.path,
      );
      bookInfo
        ? (a[book.uid] = {
            book: book,
            bookInfo: bookInfo,
          })
        : undefined;
    });
    return a;
  }, [bookInfos, books]);

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
    console.log('change');
    return (
      await Promise.all(
        arr.map(async v => {
          const ref = v.bookInfoRef;
          const data = await (await ref.get()).data();
          if (isBookInfo(data)) return data;
        }),
      )
    ).filter(isBookInfo) as BookInfo[];
  }, []);

  useEffect(() => {
    fetchBookInfos(books).then(info => setBookInfos(info));
  }, [books]);

  const getBookRef = useCallback(
    (book: Book) => {
      return db
        .collection(collectionPath.users.users)
        .doc(userUid)
        .collection(collectionPath.users.books)
        .doc(book.uid);
    },
    [userUid],
  );

  const getInfoRef = (info: BookInfo) => {
    return db.collection(collectionPath.bookInfos.bookInfos).doc(info.uid);
  };

  const getBookFromInfo = (info: BookInfo) => {
    const id = getInfoRef(info).id;
    console.log(id);
    return books.find(b => {
      console.log(b.bookInfoRef.id);
      return b.bookInfoRef.id === id;
    }) as Book;
  };

  const getInfoFromBook = (bookRef: DocumentReference) => {
    const book = books.find(book => getBookRef(book).id === bookRef.id);
    // const info = bookInfos.find(info => {
    //   return book?.bookInfoRef.path === getInfoRef(info).path;
    // });
    // console.log(info);
    // return info;
    return book ? bookDictionary[book.uid].bookInfo : undefined;
  };

  return {
    bookInfos,
    loadingBookInfo,
    fetching,
    books,
    bookSets,
    getBookFromInfo,
    getBookRef,
    getInfoRef,
    getInfoFromBook,
    bookDictionary,
  };
};

export const BookInfoContainer = createContainer(container);

export const useBookInfo = () => useContainer(BookInfoContainer);
