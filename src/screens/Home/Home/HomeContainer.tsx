import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback, useEffect } from 'react';
import { HomePresenter } from './HomePresenter';
import { useBookInfo, useToast, useAdMob } from '@src/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { BookInfo } from '@src/entities/bookInformation/bookInformation';
import { collectionPath, firestore as db } from '@src/constants';

export const HomeContainer: FC = () => {
  const navigation = useHomeNavigation();
  const { bookInfos, fetchBookOnLoad, fetching, books } = useBookInfo();
  const { showToast } = useToast();
  const { AdBanner, premium } = useAdMob();

  // ページがFocusされた時に発火
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await fetchBookOnLoad();
        } catch {
          showToast({ message: 'エラーが起きました', status: 'error' });
        }
      })();
    }, [books]), // fetchBookOnLoadにすると無限ループ
  );

  const navigateSearchBook = useCallback(() => {
    navigation.navigate(HomeKeys.SearchBook);
  }, []);

  const navigateBookDetail = useCallback(
    (bookInfo: BookInfo) => {
      const path = db
        .collection(collectionPath.bookInfos.bookInfos)
        .doc(bookInfo.uid).path;
      const book = books.find(_book => _book.bookInfoRef.path === path);
      if (book) navigation.navigate(HomeKeys.BookDetail, { book, bookInfo });
    },
    [navigation, bookInfos, books],
  );

  return (
    <HomePresenter
      onNavigateSearchBook={navigateSearchBook}
      bookInfos={bookInfos}
      onFetchBookInfo={fetchBookOnLoad}
      fetching={fetching}
      onNavigateBookDetail={navigateBookDetail}
      AdBanner={AdBanner}
      premium={premium}
    />
  );
};
