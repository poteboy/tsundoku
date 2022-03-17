import {
  useHomeNavigation,
  HomeParamList,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback } from 'react';
import { BookInfoPresenter } from './BookInfoPresenter';
import { StackActions, useRoute, RouteProp } from '@react-navigation/native';

export const BookInfoContainer: FC = () => {
  const navigation = useHomeNavigation();
  const route = useRoute<RouteProp<HomeParamList, 'Home/BookInfo'>>();

  const back = useCallback(() => {
    // navigation.dispatch(StackActions.popToTop());
    navigation.goBack();
  }, [navigation]);

  return <BookInfoPresenter onBack={back} bookInfo={route.params.bookInfo} />;
};