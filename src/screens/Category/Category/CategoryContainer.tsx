import React, { FC, useCallback, useMemo, useState } from 'react';
import { CategoryPresenter } from './CategoryPresenter';
import { useAdMob, useBookInfo, useCategory } from '@src/hooks';

export const CategoryContainer: FC = () => {
  const { AdBanner: _Ad } = useAdMob();
  const { preDefinedCategories } = useCategory();
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <CategoryPresenter
      AdBanner={AdBanner}
      categories={categories}
      onCloseModal={closeModal}
      onOpenModal={openModal}
      modalOpen={modalOpen}
    />
  );
};
