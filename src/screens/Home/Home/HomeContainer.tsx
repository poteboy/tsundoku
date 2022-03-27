import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { HomePresenter } from './HomePresenter';
import { useBookInfo, useToast, useAdMob } from '@src/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { BookInfo } from '@src/entities';
import { collectionPath, firestore as db } from '@src/constants';

export const HomeContainer: FC = () => {
  const navigation = useHomeNavigation();
  const { bookInfos, fetching, books } = useBookInfo();
  const { showToast } = useToast();
  const { AdBanner: _AD, premium } = useAdMob();

  const AdBanner = useMemo(() => _AD, []);

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
      fetching={fetching}
      onNavigateBookDetail={navigateBookDetail}
      AdBanner={AdBanner}
      premium={premium}
    />
  );
};
