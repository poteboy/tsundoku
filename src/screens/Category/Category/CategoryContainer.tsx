import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryPresenter } from './CategoryPresenter';
import { useAdMob, useBookInfo, useCategory } from '@src/hooks';
import {
  useCategoryNavigation,
  CategoryKeys,
} from '@src/navigation/CategoryNavigator/route';
import { BookSet, Category } from '@src/entities';

export const CategoryContainer: FC = () => {
  const { AdBanner: _Ad } = useAdMob();
  const { getBookSetFromRef, fetchCategory } = useCategory();
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useCategoryNavigation();

  const AdBanner = useMemo(() => _Ad, []);

  useEffect(() => {
    fetchCategory().then(_categories => {
      setCategories(_categories);
    });
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

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
