import {
  useHomeNavigation,
  HomeParamList,
} from '@src/navigation/HomeNavigator/route';
import React, { FC, useCallback, useMemo } from 'react';
import { BookInfoPresenter } from './BookInfoPresenter';
import { StackActions, useRoute, RouteProp } from '@react-navigation/native';
import { useToast, useBookInfo } from '@src/hooks';
import { useBookInfoScreen } from './useBookInfoScreen';

export const BookInfoContainer: FC = () => {
  const { showToast } = useToast();
  const navigation = useHomeNavigation();
  const route = useRoute<RouteProp<HomeParamList, 'Home/BookInfo'>>();
  const { checkAndCreate, loadingCheck } = useBookInfoScreen();
  const { fetchBookOnLoad, bookInfos } = useBookInfo();

  const back = useCallback(() => {
    // navigation.dispatch(StackActions.popToTop());
    navigation.goBack();
  }, [navigation]);

  const registerBookInfo = useCallback(async () => {
    try {
      await checkAndCreate(route.params.bookInfo);
      await fetchBookOnLoad();
      showToast({
        message: `${route.params.bookInfo.title}を追加しました`,
        status: 'success',
      });
    } catch {
      showToast({
        message: `エラーが発生しました`,
        status: 'error',
      });
    }
    navigation.dispatch(StackActions.popToTop());
  }, [checkAndCreate]);

  const isRegistered = useMemo(() => {
    return bookInfos.map(i => i.uid).includes(route.params.bookInfo.uid);
  }, [bookInfos]);

  return (
    <BookInfoPresenter
      onBack={back}
      bookInfo={route.params.bookInfo}
      onRegisterBookInfo={registerBookInfo}
      loadingCheck={loadingCheck}
      isRegistered={isRegistered}
    />
  );
};
