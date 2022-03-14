import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback } from 'react';
import { HomePresenter } from './HomePresenter';

export const HomeContainer: FC = () => {
  const navigation = useHomeNavigation();

  const navigateSearchBook = useCallback(() => {
    navigation.navigate(HomeKeys.SearchBook);
  }, []);

  return <HomePresenter onNavigateSearchBook={navigateSearchBook} />;
};
