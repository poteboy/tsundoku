import React, { FC, useCallback, useMemo } from 'react';
import { BookDetailPresenter } from './BookDetailPresenter';
import { StackActions, useRoute, RouteProp } from '@react-navigation/native';
import {
  useHomeNavigation,
  HomeParamList,
} from '@src/navigation/HomeNavigator/route';
import { useBookDetail } from './useBookDetail';
import { useToast } from '@src/hooks';
import { Alert } from 'react-native';

export const BookDetailContainer: FC = () => {
  const navigation = useHomeNavigation();
  const route = useRoute<RouteProp<HomeParamList, 'Home/BookDetail'>>();
  const { showToast } = useToast();

  const { bookInfo, book } = route.params;
  const { deleteBook, loadingDelete } = useBookDetail(route.params);

  const onDeleteBook = useCallback(async () => {
    Alert.alert('本当に削除しますか？', '', [
      {
        text: '削除',
        onPress: async () => {
          try {
            await deleteBook();
            showToast({
              message: `${bookInfo.title}を削除しました`,
              status: 'success',
            });
            navigation.dispatch(StackActions.popToTop());
          } catch {
            showToast({ message: `エラーが起きました`, status: 'error' });
          }
        },
        style: 'destructive',
      },
      {
        text: 'キャンセル',
        style: 'cancel',
      },
    ]);
  }, [showToast, deleteBook, navigation]);

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <BookDetailPresenter
      onDeleteBook={onDeleteBook}
      onBack={back}
      book={book}
      bookInfo={bookInfo}
      loadingDeletion={loadingDelete}
    />
  );
};
