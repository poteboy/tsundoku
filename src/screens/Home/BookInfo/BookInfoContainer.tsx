import {
  useHomeNavigation,
  HomeParamList,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback } from 'react';
import { BookInfoPresenter } from './BookInfoPresenter';
import { StackActions, useRoute, RouteProp } from '@react-navigation/native';
import { useBookInfo, useToast } from '@src/hooks';

export const BookInfoContainer: FC = () => {
  const { showToast } = useToast();
  const navigation = useHomeNavigation();
  const route = useRoute<RouteProp<HomeParamList, 'Home/BookInfo'>>();
  const { updateBookInfos } = useBookInfo();

  const back = useCallback(() => {
    // navigation.dispatch(StackActions.popToTop());
    navigation.goBack();
  }, [navigation]);

  const registerBookInfo = useCallback(() => {
    updateBookInfos(route.params.bookInfo);
    showToast({
      message: `${route.params.bookInfo.title}を追加しました`,
      status: 'success',
    });
    navigation.dispatch(StackActions.popToTop());
  }, [updateBookInfos]);

  return (
    <BookInfoPresenter
      onBack={back}
      bookInfo={route.params.bookInfo}
      onRegisterBookInfo={registerBookInfo}
    />
  );
};
