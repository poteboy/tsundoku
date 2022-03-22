import React, { useMemo } from 'react';
import { BookSet, Category } from '@src/entities';
import { useBookInfo } from '@src/hooks';
import { useTabContext } from '@src/navigation/context';

export const useCategory = () => {
  const { bookSets } = useBookInfo();
  const { user } = useTabContext();

  const preDefinedCategories: Category[] = useMemo(() => {
    return [
      {
        uid: 'ThisIsThePreDefinedCategoryForAll',
        createdAt: user.createdAt,
        active: user.active,
        name: 'すべて',
        bookSets,
      },
    ];
  }, [bookSets, user]);

  return { preDefinedCategories };
};
