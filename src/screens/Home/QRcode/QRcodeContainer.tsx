import {
  HomeKeys,
  useHomeNavigation,
} from '@src/navigation/HomeNavigator/route';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import React, { FC, useEffect, useState, useCallback } from 'react';
import { QRcodePresenter } from './QRcodePresenter';
import { BookResponse, isBookResponse, convertRespToBook } from '@src/entities';
import { unstable_batchedUpdates } from 'react-native';

export const QRcodeContainer: FC = () => {
  const [permitted, setPermitted] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [book, setBook] = useState<BookResponse | undefined>(undefined);
  const [isbn, setIsbn] = useState<string>();
  const navigation = useHomeNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermitted(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (!!book && !!isbn) {
      const bookInfo = convertRespToBook(book, isbn);
      close();
      navigation.navigate(HomeKeys.BookInfo, { bookInfo });
    }
  }, [book, isbn]);

  const handleQR = useCallback(async ({ type, data }: BarCodeEvent) => {
    if (data.slice(0, 3) === '192') return;
    if (data.slice(0, 3) === '978' || data.slice(0, 2) === '979') {
      setScanned(true);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`,
      );
      const json = await res.json();
      const item = json.items[0];
      if (isBookResponse(item)) {
        unstable_batchedUpdates(() => {
          setIsbn(data);
          setBook(item);
        });
      } else {
        setScanned(false);
      }
    }
    return;
  }, []);

  const close = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <QRcodePresenter
      {...{ permitted }}
      onHandleQR={handleQR}
      scanned={scanned}
      onClose={close}
    />
  );
};
