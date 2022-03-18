import { useCallback, useState } from 'react';
import { BookInfo, Book } from '@src/entities';
import { useContainer, createContainer } from 'unstated-next';
import { useAuth } from '..';
import { useTabContext } from '@src/navigation/context';

const container = () => {
  const { user } = useTabContext();
  const { uid } = user;
  const [book, setBook] = useState<Book>();
  const [bookInfos, setBooks] = useState<BookInfo[]>([]);
  const [loadingBookInfo, setLoadingBookInfo] = useState(false);

  const updateBookInfos = useCallback(
    (info: BookInfo) => {
      setBooks(infos => {
        return [...infos, info];
      });
    },
    [setBooks],
  );

  return { bookInfos, loadingBookInfo, updateBookInfos };
};

export const BookInfoContainer = createContainer(container);

export const useBookInfo = () => useContainer(BookInfoContainer);
