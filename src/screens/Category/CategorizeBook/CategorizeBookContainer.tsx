import {
  useCategoryNavigation,
  CategoryParamList,
  CategoryKeys,
} from '@src/navigation/CategoryNavigator/route';
import React, { FC, useCallback, useState } from 'react';
import { CategorizeBookPresenter } from './CategorizeBookPresenter';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useBookInfo, useCategory, useToast } from '@src/hooks';
import { Book } from '@src/entities';
import { DocumentReference } from '@src/constants';
import { useTabContext } from '@src/navigation/context';

export const CategorizeBookContainer: FC = () => {
  const navigation = useCategoryNavigation();
  const {
    params: { category },
  } = useRoute<RouteProp<CategoryParamList, 'Category/CategorizeBook'>>();
  const { bookInfos, getBookFromInfo, getBookRef } = useBookInfo();
  const [selectedRefs, setSelectedRefs] = useState<DocumentReference[]>([]);
  const { addBookRefsToCategory } = useCategory();
  const { showToast } = useToast();

  const selectBook = useCallback((book: Book) => {
    const ref = getBookRef(book);
    setSelectedRefs(refs => {
      return [...refs, ref];
    });
  }, []);

  const unselectBook = useCallback((book: Book) => {
    const ref = getBookRef(book);
    const filtered = selectedRefs.filter(refs => refs.id !== ref.id);
    setSelectedRefs(filtered);
  }, []);

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onCreate = useCallback(async () => {
    try {
      await addBookRefsToCategory(selectedRefs, category);
      navigation.goBack();
      navigation.navigate(CategoryKeys.BookList, { category });
    } catch {
      showToast({ message: 'エラーが起きました', status: 'error' });
      navigation.goBack();
    }
  }, [category, selectedRefs, showToast]);

  return (
    <CategorizeBookPresenter
      onBack={back}
      category={category}
      bookInfos={bookInfos}
      selectedRefs={selectedRefs}
      getBookFromInfo={getBookFromInfo}
      {...{ selectBook, unselectBook, onCreate }}
    />
  );
};
