import React, { FC } from 'react';
import { CategoryPresenter } from './CategoryPresenter';
import { useAdMob, useBookInfo } from '@src/hooks';

export const CategoryContainer: FC = () => {
  const { AdBanner } = useAdMob();
  const { bookSets } = useBookInfo();

  return <CategoryPresenter AdBanner={AdBanner} />;
};
