import { Header } from '@src/components';
import React, { FC, memo } from 'react';
import { Book } from '@src/entities';

type Props = {
  book: Book;
  onBack: () => void;
};

export const BookInfoPresenter: FC<Props> = memo(({ onBack }) => {
  return (
    <>
      <Header title="本の情報" onBack={onBack} />
    </>
  );
});
