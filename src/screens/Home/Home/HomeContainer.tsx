import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback } from 'react';
import { HomePresenter } from './HomePresenter';

export const HomeContainer: FC = () => {
  const navigation = useHomeNavigation();

  const navigateQR = useCallback(() => {
    navigation.navigate(HomeKeys.QRcode);
  }, [navigation]);

  return <HomePresenter onNavigateQR={navigateQR} />;
};
