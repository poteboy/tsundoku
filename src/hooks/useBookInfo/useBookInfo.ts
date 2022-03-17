import { useCallback, useState } from 'react';
import { BookInfo } from '@src/entities';
import { useContainer, createContainer } from 'unstated-next';

const container = () => {
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
