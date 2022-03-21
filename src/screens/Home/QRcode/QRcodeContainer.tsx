import {
  HomeKeys,
  useHomeNavigation,
} from '@src/navigation/HomeNavigator/route';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import React, { FC, useEffect, useState, useCallback } from 'react';
import { QRcodePresenter } from './QRcodePresenter';
import { BookInfo } from '@src/entities';
import { unstable_batchedUpdates } from 'react-native';
import { urls } from '@src/constants';
import { useToast, useRakuten } from '@src/hooks';

export const QRcodeContainer: FC = () => {
  const [permitted, setPermitted] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [book, setBook] = useState<BookInfo | undefined>(undefined);
  const [isbn, setIsbn] = useState<string>();
  const [isError, setIsError] = useState(false);
  const { showToast } = useToast();
  const { searchBookByIsbn } = useRakuten();
  const navigation = useHomeNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermitted(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (!!book && !!isbn) {
      close();
      navigation.navigate(HomeKeys.BookInfo, { bookInfo: book });
    }
  }, [book, isbn]);

  const disable = useCallback(() => {
    unstable_batchedUpdates(() => {
      setScanned(false);
      setIsError(true);
    });
    showToast({ message: '読み取りエラーが発生しました', status: 'error' });
    navigation.goBack();
  }, [setScanned, setIsError]);

  const handleQR = useCallback(
    async ({ type, data }: BarCodeEvent) => {
      if (data.slice(0, 3) === '192') return;
      if (data.slice(0, 3) === '978' || data.slice(0, 2) === '979') {
        setScanned(true);
        try {
          const bookInfo = await searchBookByIsbn(data);
          if (bookInfo) {
            unstable_batchedUpdates(() => {
              setIsbn(data);
              setBook(bookInfo);
              setScanned(false);
            });
          } else {
            disable();
          }
        } catch (e) {
          disable();
        }
      }
    },
    [disable],
  );

  const close = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <QRcodePresenter
      {...{ permitted }}
      onHandleQR={handleQR}
      scanned={scanned}
      onClose={close}
      isError={isError}
    />
  );
};
