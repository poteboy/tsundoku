import React, { FC, useCallback, useState } from 'react';
import { BookListPresenter } from './BookListPresenter';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  CategoryParamList,
  useCategoryNavigation,
} from '@src/navigation/CategoryNavigator/route';
import { ThreDotIcon } from '@src/icons';
import { Pressable } from 'native-base';

export const BookListContainer: FC = () => {
  const { bookSets, category } =
    useRoute<RouteProp<CategoryParamList, 'Category/BookList'>>().params;
  const navigation = useCategoryNavigation();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <BookListPresenter
      bookSets={bookSets}
      category={category}
      onBack={back}
      RightIcon={RightIcon}
      onCloseSheet={closeSheet}
      isOpenSheet={isOpen}
    />
  );
};
