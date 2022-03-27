import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryPresenter } from './CategoryPresenter';
import { useAdMob, useBookInfo, useCategory, useToast } from '@src/hooks';
import {
  useCategoryNavigation,
  CategoryKeys,
} from '@src/navigation/CategoryNavigator/route';
import { BookSet, Category } from '@src/entities';
import { useCategoryScreen } from './useCategoryScreen';

export const CategoryContainer: FC = () => {
  const { AdBanner: _Ad } = useAdMob();
  const { getBookFromRef, categories } = useCategory();
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useCategoryNavigation();
  const { createCategory } = useCategoryScreen();
  const { showToast } = useToast();

  const AdBanner = useMemo(() => _Ad, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const navigateBookList = useCallback(
    (category: Category) => {
      navigation.navigate(CategoryKeys.BookList, { category });
    },
    [navigation],
  );

  const onCreateCategory = useCallback(
    async (name: string) => {
      try {
        const _category = await createCategory(name);
        showToast({
          message: `${_category.name}を追加しました`,
          status: 'success',
        });
        navigation.navigate(CategoryKeys.CategorizeBook, {
          category: _category,
        });
      } catch {
        showToast({ message: 'エラーが起きました', status: 'error' });
      }
    },
    [showToast, navigation],
  );

  return (
    <CategoryPresenter
      AdBanner={AdBanner}
      categories={categories.sort((y, z) =>
        y.createdAt > z.createdAt ? 1 : -1,
      )}
      onCloseModal={closeModal}
      onOpenModal={openModal}
      modalOpen={modalOpen}
      onNavigateBookList={navigateBookList}
      onCreateCategory={onCreateCategory}
      getBookFromRef={getBookFromRef}
    />
  );
};
