import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BookListPresenter } from './BookListPresenter';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  CategoryKeys,
  CategoryParamList,
  useCategoryNavigation,
} from '@src/navigation/CategoryNavigator/route';
import { ThreDotIcon } from '@src/icons';
import { Pressable } from 'native-base';
import { useBookList } from './useBookList';
import { useCategory, useToast } from '@src/hooks';

export const BookListContainer: FC = () => {
  const { category: _category } =
    useRoute<RouteProp<CategoryParamList, 'Category/BookList'>>().params;
  const navigation = useCategoryNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const { deleteCategory, getCategory } = useBookList();
  const { showToast } = useToast();
  const { getBookFromRef } = useCategory();
  const [category, setCategory] = useState(_category);

  useFocusEffect(
    useCallback(() => {
      getCategory(category.uid).then(c => {
        if (c) setCategory(c);
      });
    }, []),
  );

  const bookSet = useMemo(() => {
    return (
      category.bookRefs.map(ref => {
        return getBookFromRef(ref);
      }) ?? []
    );
  }, [getBookFromRef, category]);

  const closeSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateBookInfo = useCallback(() => {
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

  const RightIcon = useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          setIsOpen(true);
        }}
      >
        <ThreDotIcon size={24} />
      </Pressable>
    );
  }, []);

  const onDeleteCategory = useCallback(async () => {
    Alert.alert(`本当に削除しますか`, '', [
      {
        text: '削除',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCategory(category.uid);
            showToast({ message: '削除しました', status: 'success' });
            navigation.navigate(CategoryKeys.Category);
          } catch {
            showToast({ message: 'エラーが発生しました', status: 'error' });
          }
        },
      },
      {
        text: 'キャンセル',
        style: 'cancel',
      },
    ]);
  }, [showToast, category]);

  const navigateCategorize = () => {
    navigation.navigate(CategoryKeys.CategorizeBook, { category });
  };

  return (
    <BookListPresenter
      category={category}
      onBack={back}
      RightIcon={RightIcon}
      onCloseSheet={closeSheet}
      isOpenSheet={isOpen}
      onDeleteCategory={onDeleteCategory}
      onNavigateCategorize={navigateCategorize}
      bookSet={bookSet}
    />
  );
};
