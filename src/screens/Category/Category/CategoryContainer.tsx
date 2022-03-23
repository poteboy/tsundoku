import React, { FC, useCallback, useMemo, useState } from 'react';
import { CategoryPresenter } from './CategoryPresenter';
import { useAdMob, useBookInfo, useCategory } from '@src/hooks';
import {
  useCategoryNavigation,
  CategoryKeys,
} from '@src/navigation/CategoryNavigator/route';
import { BookSet, Category } from '@src/entities';

export const CategoryContainer: FC = () => {
  const { AdBanner: _Ad } = useAdMob();
  const { preDefinedCategories, getBookSetFromRef } = useCategory();
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useCategoryNavigation();

  const AdBanner = useMemo(() => _Ad, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const categories = useMemo(() => {
    return preDefinedCategories;
  }, [preDefinedCategories]);

  const navigateBookList = useCallback(
    (category: Category, bookSets: BookSet[]) => {
      navigation.navigate(CategoryKeys.BookList, { category, bookSets });
    },
    [navigation],
  );

  return (
    <CategoryPresenter
      AdBanner={AdBanner}
      categories={categories}
      onCloseModal={closeModal}
      onOpenModal={openModal}
      modalOpen={modalOpen}
      getBookSetFromRef={getBookSetFromRef}
      onNavigateBookList={navigateBookList}
    />
  );
};
