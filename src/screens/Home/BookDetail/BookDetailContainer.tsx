import React, { FC, useCallback, useMemo } from 'react';
import { BookDetailPresenter } from './BookDetailPresenter';
import { StackActions, useRoute, RouteProp } from '@react-navigation/native';
import {
  useHomeNavigation,
  HomeParamList,
} from '@src/navigation/HomeNavigator/route';

export const BookDetailContainer: FC = () => {
  const navigation = useHomeNavigation();
  const route = useRoute<RouteProp<HomeParamList, 'Home/BookDetail'>>();

  const { bookInfo, book: _book } = route.params;

  const book = useMemo(() => {
    return _book!;
  }, []);

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  console.log(book);

  return <BookDetailPresenter onBack={back} book={book} bookInfo={bookInfo} />;
};
