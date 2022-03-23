import React, { FC, useCallback, useMemo } from 'react';
import { BookDetailPresenter } from './BookDetailPresenter';
import { StackActions, useRoute, RouteProp } from '@react-navigation/native';
import {
  useHomeNavigation,
  HomeParamList,
} from '@src/navigation/HomeNavigator/route';
import { useBookDetail } from './useBookDetail';
import { useAdMob, useToast } from '@src/hooks';
import { Alert } from 'react-native';
import { Pressable } from 'native-base';
import { TrashRightIcon } from '@src/icons';

export const BookDetailContainer: FC = () => {
  const navigation = useHomeNavigation();
  const route = useRoute<RouteProp<HomeParamList, 'Home/BookDetail'>>();
  const { showToast } = useToast();
  const { AdBanner, premium } = useAdMob();

  const { bookInfo, book } = route.params;
  const { deleteBook, loadingDelete } = useBookDetail(route.params);

  const onDeleteBook = useCallback(async () => {
    Alert.alert(
      '本当に削除しますか？',
      `削除すると「${bookInfo.title}」に記入した記録は全て失われます。`,
      [
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
      ],
    );
  }, [showToast, deleteBook, navigation]);

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const TrashIcon = () => (
    <TrashRightIcon
      onPress={onDeleteBook}
      loading={loadingDelete}
      testID="delete"
    />
  );

  return (
    <BookDetailPresenter
      onDeleteBook={onDeleteBook}
      onBack={back}
      book={book}
      bookInfo={bookInfo}
      loadingDeletion={loadingDelete}
      AdBanner={AdBanner}
      TrashIcon={TrashIcon}
    />
  );
};
