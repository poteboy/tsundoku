import React, { FC, useState, memo } from 'react';
import { VStack } from 'native-base';
import { Header } from '@src/components';
import { BookInfo, Book } from '@src/entities';

type Props = {
  onBack: () => void;
  bookInfo: BookInfo;
  book: Book;
};

export const BookDetailPresenter: FC<Props> = memo(
  ({ book, bookInfo, onBack }) => {
    return (
      <>
        <VStack flex={1}>
          <Header title={bookInfo.title} onBack={onBack} />
          <></>
        </VStack>
      </>
    );
  },
);
