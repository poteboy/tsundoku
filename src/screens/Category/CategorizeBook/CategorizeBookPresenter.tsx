import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { VStack, Image, HStack, Pressable, Button } from 'native-base';
import { Header } from '@src/components';
import { Category, BookInfo, Book } from '@src/entities';
import { getImg } from '@src/util';
import { DocumentReference, firestore } from '@src/constants';
import { useBookInfo } from '@src/hooks';
import { colors } from '@src/styles';

type Props = {
  onBack: () => void;
  category: Category;
  bookInfos: BookInfo[];
  selectedRefs: DocumentReference[];
  getBookFromInfo: (info: BookInfo) => Book;
  selectBook: (book: Book) => void;
  unselectBook: (book: Book) => void;
  onCreate: () => void;
};

export const CategorizeBookPresenter: FC<Props> = memo(
  ({
    onBack,
    category,
    bookInfos,
    selectedRefs,
    getBookFromInfo,
    selectBook,
    unselectBook,
    onCreate,
  }) => {
    return (
      <VStack flex={1} bg={colors.lightGray}>
        <Header title={category.name + 'に追加'} onClose={onBack} />
        <HStack flexWrap="wrap">
          {bookInfos.map(info => {
            return (
              <BookItem
                bookInfo={info}
                key={info.uid}
                selectedRefs={selectedRefs}
                getBookFromInfo={getBookFromInfo}
                {...{ selectBook, unselectBook }}
              />
            );
          })}
        </HStack>
        <Button
          alignSelf="center"
          py={4}
          px={6}
          position="absolute"
          bottom={20}
          shadow={3}
          borderRadius={20}
          _text={{ fontSize: 'lg' }}
          disabled={selectedRefs.length < 1}
          onPress={onCreate}
        >
          {`追加(${selectedRefs.length})`}
        </Button>
      </VStack>
    );
  },
);

type ItemProps = {
  bookInfo: BookInfo;
  selectedRefs: DocumentReference[];
  getBookFromInfo: (info: BookInfo) => Book;
  selectBook: (book: Book) => void;
  unselectBook: (book: Book) => void;
};

const screenWidth = Dimensions.get('screen').width;
const BookItem: FC<ItemProps> = memo(
  ({ bookInfo, selectedRefs, getBookFromInfo, selectBook, unselectBook }) => {
    const { getBookRef } = useBookInfo();
    const book = getBookFromInfo(bookInfo);

    const isSelected = useMemo(() => {
      console.log(selectedRefs);
      return selectedRefs.some(refs => refs.id === getBookRef(book).id);
    }, [bookInfo, selectedRefs, unselectBook]);

    const select = useCallback(() => {
      isSelected ? unselectBook(book) : selectBook(book);
    }, [selectBook, unselectBook, isSelected]);

    return (
      <Pressable onPress={select}>
        <Image
          source={getImg(bookInfo.imgUrl)}
          width={`${screenWidth / 5}px`}
          height={`${(screenWidth / 5) * 1.5}px`}
          resizeMode="contain"
          mt={2}
          ml={`${screenWidth / 25}px`} // 1/5分スペースが余ったさらに5等分
          alt={bookInfo.uid}
          opacity={isSelected ? 0.5 : 1}
        />
      </Pressable>
    );
  },
);
