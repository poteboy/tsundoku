import React, { FC, useCallback } from 'react';
import { BookListPresenter } from './BookListPresenter';
import { StackActions, useRoute, RouteProp } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  CategoryParamList,
  useCategoryNavigation,
} from '@src/navigation/CategoryNavigator/route';
import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';

export const BookListContainer: FC = () => {
  const { bookSets, category } =
    useRoute<RouteProp<CategoryParamList, 'Category/BookList'>>().params;
  const navigation = useCategoryNavigation();
  const homeNavigation = useHomeNavigation();

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateBookInfo = useCallback(() => {
    // homeNavigation.navigate(HomeKeys.BookDetail, bookSets[0]);
    Alert.alert(`削除する`, '', [
      {
        text: '削除',
        style: 'destructive',
      },
      {
        text: 'キャンセル',
        style: 'cancel',
      },
    ]);
  }, []);

  return (
    <BookListPresenter
      bookSets={bookSets}
      category={category}
      onBack={back}
      onNavigateBookInfo={navigateBookInfo}
    />
  );
};
