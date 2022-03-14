import React, { FC, useCallback } from 'react';
import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import { SearchBookPresenter } from './SearchBookPresenter';

export const SearchBookContainer: FC = () => {
  const navigation = useHomeNavigation();

  const back = useCallback(() => {
    navigation.goBack();
  }, []);

  const navigateQR = useCallback(() => {
    navigation.navigate(HomeKeys.QRcode);
  }, []);

  return <SearchBookPresenter onBack={back} onNavigateQR={navigateQR} />;
};
