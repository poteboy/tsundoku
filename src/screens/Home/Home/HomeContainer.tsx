import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback } from 'react';
import { HomePresenter } from './HomePresenter';
import { mockBookInfo } from '@src/entities';

export const HomeContainer: FC = () => {
  const navigation = useHomeNavigation();

  const navigateSearchBook = useCallback(() => {
    // if (__DEV__) navigation.navigate(HomeKeys.BookInfo, { bookInfo: mockBook });

    navigation.navigate(HomeKeys.SearchBook);
  }, []);

  return <HomePresenter onNavigateSearchBook={navigateSearchBook} />;
};
