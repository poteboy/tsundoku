import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback, useEffect } from 'react';
import { HomePresenter } from './HomePresenter';
import { useBookInfo } from '@src/hooks';
import { useFocusEffect } from '@react-navigation/native';

export const HomeContainer: FC = () => {
  const navigation = useHomeNavigation();
  const { bookInfos, fetchBookOnLoad, fetching } = useBookInfo();

  // ページがFocusされた時に発火
  useFocusEffect(
    useCallback(() => {
      console.log('hello');
      fetchBookOnLoad();
    }, []),
  );

  const navigateSearchBook = useCallback(() => {
    navigation.navigate(HomeKeys.SearchBook);
  }, []);

  return (
    <HomePresenter
      onNavigateSearchBook={navigateSearchBook}
      bookInfos={bookInfos}
      onFetchBookInfo={fetchBookOnLoad}
      fetching={fetching}
    />
  );
};
