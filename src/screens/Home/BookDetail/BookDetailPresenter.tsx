import React, { FC, useState, memo } from 'react';
import { VStack, Button } from 'native-base';
import { Header } from '@src/components';
import { BookInfo, Book } from '@src/entities';
import { colors } from '@src/styles';

type Props = {
  onBack: () => void;
  bookInfo: BookInfo;
  book: Book;
  onDeleteBook: () => void;
  loadingDeletion: boolean;
};

export const BookDetailPresenter: FC<Props> = memo(
  ({ book, bookInfo, onBack, onDeleteBook, loadingDeletion }) => {
    return (
      <>
        <Header title={bookInfo.title} onBack={onBack} />
        <VStack flex={1} justifyContent="center">
          <Button
            onPress={onDeleteBook}
            variant="danger"
            disabled={loadingDeletion}
          >
            {loadingDeletion ? '削除中...' : '本棚から削除する'}
          </Button>
        </VStack>
      </>
    );
  },
);
